#!/bin/bash

# --- API Configuration ---
readonly GEOLOCATION_APIS=(
  "https://ipinfo.io"
  "http://ip-api.com/json"
  "https://reallyfreegeoip.org/json/"
  "https://freegeoip.app/json/"
  "http://ipwho.is"
)
readonly GEOLOCATION_BLACKLIST_FILE="/tmp/geolocation_api_blacklist"
readonly GEOLOCATION_BLACKLIST_DURATION=21600 # 6 hours in seconds

readonly WEATHER_API="https://api.open-meteo.com/v1/forecast"
readonly AQ_API="https://air-quality-api.open-meteo.com/v1/air-quality"

geo_api_selector() {
  local action="$1"
  local api_name_param="$2"
  local current_time=$(date +%s)

  declare -A blacklist
  if [ -f "$GEOLOCATION_BLACKLIST_FILE" ]; then
    while IFS=':' read -r name timestamp; do
      blacklist["$name"]="$timestamp"
    done <"$GEOLOCATION_BLACKLIST_FILE"
  fi

  if [ "$action" = "get_next_available" ]; then
    for api_url in "${GEOLOCATION_APIS[@]}"; do
      local api_name=$(echo "$api_url" | awk -F[/:] '{print $4}')
      local blacklist_until=${blacklist["$api_name"]}

      if [ -z "$blacklist_until" ] || [ "$current_time" -ge "$blacklist_until" ]; then
        # API is not blacklisted or blacklist has expired
        echo "$api_url"
        return 0
      fi
    done
    echo "" # No available API
    return 1
  elif [ "$action" = "blacklist" ]; then
    local blacklist_until=$(($current_time + GEOLOCATION_BLACKLIST_DURATION))
    blacklist["$api_name_param"]="$blacklist_until"

    # Rewrite the blacklist file
    >"$GEOLOCATION_BLACKLIST_FILE"
    for name in "${!blacklist[@]}"; do
      echo "$name:${blacklist["$name"]}" >>"$GEOLOCATION_BLACKLIST_FILE"
    done
    return 0
  fi
}

standardize_geo_data() {
  local raw_api_response="$1"
  local latitude=""
  local longitude=""
  local city=""
  local country=""

  # Check for `.loc` like "48.85,2.35" and split it
  local loc=$(echo "$raw_api_response" | jq -r '
    to_entries
    | map(select(.key | test("^loc"; "i")))
    | .[0].value // empty' 2>/dev/null)
  if [[ -n "$loc" && "$loc" == *,* ]]; then
    latitude="${loc%%,*}"
    longitude="${loc##*,}"
  else
    # Find latitude key (matches: lat, latitude, etc.)
    latitude=$(echo "$raw_api_response" | jq -r '
      to_entries
      | map(select(.key | test("^lat(i(tude)?)?$"; "i")))
      | .[0].value // empty' 2>/dev/null)

    # Find longitude key (matches: lon, long, lng, etc.)
    longitude=$(echo "$raw_api_response" | jq -r '
      to_entries
      | map(select(.key | test("^lon(g(i(tude)?)?)?$"; "i") or test("^lng$"; "i")))
      | .[0].value // empty' 2>/dev/null)
  fi

  # Extract city (e.g., city_name, CityName, city)
  city=$(echo "$raw_api_response" | jq -r '
    to_entries
    | map(select(.key | test("^city"; "i")))
    | .[0].value // ""' 2>/dev/null)

  # Extract country (e.g., country_name, countryCode)
  country=$(echo "$raw_api_response" | jq -r '
    to_entries
    | map(select(.key | test("^country"; "i")))
    | .[0].value // ""' 2>/dev/null)

  # Return structured JSON output
  echo "{\"latitude\":\"$latitude\",\"longitude\":\"$longitude\",\"city\":\"$city\",\"country\":\"$country\"}"
}

fetch_location_data() {
  local api_url
  local api_name
  local raw_api_response
  local standardized_geo_json
  local coordinates_string
  local exit_code

  for i in $( # Iterate through all APIs once
    seq 1 ${#GEOLOCATION_APIS[@]}
  ); do
    api_url=$(geo_api_selector "get_next_available")
    if [ -z "$api_url" ]; then
      echo "DEBUG: All geolocation APIs are blacklisted or exhausted." >&2
      break # No more APIs to try
    fi

    api_name=$(echo "$api_url" | awk -F[/:] '{print $4}')
    raw_api_response=$("$(dirname "$0")/cached-fetch.sh" --url "$api_url" --cache-name "geoLocation" --ttl 21600)
    exit_code=$?

    if [ "$exit_code" -eq 0 ]; then
      # API call successful, format and check if coordinates_string is valid
      standardized_geo_json=$(standardize_geo_data "$raw_api_response")
      latitude=$(echo "$standardized_geo_json" | jq -r '.latitude // empty' 2>/dev/null)
      longitude=$(echo "$standardized_geo_json" | jq -r '.longitude // empty' 2>/dev/null)

      if [[ -n "$latitude" && "$latitude" != "null" && -n "$longitude" && "$longitude" != "null" ]]; then
        echo "$standardized_geo_json"
        return 0
      else
        # Coordinates are invalid/missing - blacklist this API and continue
        geo_api_selector "blacklist" "$(echo "$api_url" | awk -F[/:] '{print $4}')"
      fi
    else
      # API fetch failed - blacklist and continue
      geo_api_selector "blacklist" "$(echo "$api_url" | awk -F[/:] '{print $4}')"
    fi
  done

  echo "" # All attempts failed
  return 1
}

fetch_weather_data() {
  local lat="$1"
  local lon="$2"
  local url="$WEATHER_API?latitude=$lat&longitude=$lon&current_weather=true&daily=sunrise,sunset&hourly=pressure_msl&timezone=auto"
  "$(dirname "$0")/cached-fetch.sh" --url "$url" --cache-name "weather" --ttl 900 # Cache for 15 minutes
}

fetch_aq_data() {
  local lat="$1"
  local lon="$2"
  local url="$AQ_API?latitude=$lat&longitude=$lon&hourly=us_aqi&timezone=auto"
  "$(dirname "$0")/cached-fetch.sh" --url "$url" --cache-name "airQuality" --ttl 1800 # Cache for 30 minutes
}

get_coordinates() {
  local standardized_geo_json
  standardized_geo_json=$(fetch_location_data)

  if [ -n "$standardized_geo_json" ]; then
    local latitude=$(echo "$standardized_geo_json" | jq -r '.latitude // empty' 2>/dev/null)
    local longitude=$(echo "$standardized_geo_json" | jq -r '.longitude // empty' 2>/dev/null)

    if [[ -n "$latitude" && "$latitude" != "null" && -n "$longitude" && "$longitude" != "null" ]]; then
      echo "$latitude,$longitude"
      return 0
    fi
  fi

  echo ""
  return 1
}

get_location() {
  local standardized_geo_json=$(fetch_location_data)
  local city=""
  local country=""
  if [ -n "$standardized_geo_json" ]; then
    city=$(echo "$standardized_geo_json" | jq -r '.city // empty' 2>/dev/null)
    country=$(echo "$standardized_geo_json" | jq -r '.country // empty' 2>/dev/null)
  fi

  if [ -n "$city" ] || [ -n "$country" ]; then
    echo "$city, $country"
  fi
}

get_temperature() {
  local coordinates=$(get_coordinates)
  if [ -z "$coordinates" ]; then
    echo "❓ N/A °C"
    return
  fi
  local latitude=${coordinates%%,*}
  local longitude=${coordinates##*,}
  local api_response=""
  if [ -n "$latitude" ] && [ -n "$longitude" ]; then
    api_response=$(fetch_weather_data "$latitude" "$longitude")
  fi
  local temperature=$(echo "$api_response" | jq -r '.current_weather.temperature // empty')
  local icon=$(get_weather_icon)
  if [ -z "$temperature" ]; then
    echo "❓ N/A °C"
  else
    echo "$icon ${temperature}°C"
  fi
}

get_wind_condition() {
  local coordinates=$(get_coordinates)
  if [ -z "$coordinates" ]; then
    echo "❓ N/A km/h"
    return
  fi
  local latitude=${coordinates%%,*}
  local longitude=${coordinates##*,}
  local api_response=""
  if [ -n "$latitude" ] && [ -n "$longitude" ]; then
    api_response=$(fetch_weather_data "$latitude" "$longitude")
  fi
  local windspeed=$(echo "$api_response" | jq -r '.current_weather.windspeed // empty')
  if [ -z "$windspeed" ]; then
    echo "❓ N/A km/h"
  else
    echo "💨 ${windspeed} km/h"
  fi
}

get_aqi() {
  local coordinates=$(get_coordinates)
  if [ -z "$coordinates" ]; then
    echo "❓ Air Quality: N/A"
    return
  fi
  local latitude=${coordinates%%,*}
  local longitude=${coordinates##*,}
  local api_response=""
  if [ -n "$latitude" ] && [ -n "$longitude" ]; then
    api_response=$(fetch_aq_data "$latitude" "$longitude")
  fi
  local aqi=$(echo "$api_response" | jq -r '.hourly.us_aqi[0] // empty') # Assuming we want the first hour's AQI
  if [ -z "$aqi" ]; then
    echo "❓ Air Quality: N/A"
    return
  fi
  if [ "$aqi" -le 50 ]; then
    echo "🌀 $aqi - good air quality"
  elif [ "$aqi" -le 100 ]; then
    echo "🤧 $aqi - moderate air quality"
  elif [ "$aqi" -le 150 ]; then
    echo "🫥 $aqi - unhealthy for sensitive air quality"
  elif [ "$aqi" -le 200 ]; then
    echo "🚷 $aqi - unhealthy air quality"
  elif [ "$aqi" -le 300 ]; then
    echo "☣️ $aqi - very unhealthy air quality"
  else
    echo "💀 $aqi - hazardous air quality"
  fi
}

get_mmhg_pressure() {
  local coordinates=$(get_coordinates)
  if [ -z "$coordinates" ]; then
    echo "❓ N/A mmHg"
    return
  fi
  local latitude=${coordinates%%,*}
  local longitude=${coordinates##*,}
  local api_response=""
  if [ -n "$latitude" ] && [ -n "$longitude" ]; then
    api_response=$(fetch_weather_data "$latitude" "$longitude")
  fi
  local pressure_hpa=$(echo "$api_response" | jq -r '.hourly.pressure_msl[0] // empty') # Assuming first hour
  if [ -z "$pressure_hpa" ]; then
    echo "🌬️ N/A mmHg"
    return
  fi
  local pressure_mmhg=$(awk "BEGIN { printf \"%.0f\", $pressure_hpa * 0.75006 }")
  if ((pressure_mmhg < 740)); then
    echo "🌬️ $pressure_mmhg mmHg - low" # 🔽
  elif ((pressure_mmhg > 770)); then
    echo "🌬️ $pressure_mmhg mmHg - high" # 🔼
  else
    echo "🌬️ $pressure_mmhg mmHg - normal" # ⏺️
  fi
}

get_last_updated_times() {
  local log_file="/tmp/cache_fetch_last_update"
  if [ ! -f "$log_file" ]; then
    return
  fi

  local weather=$(grep "^weather:" "$log_file" | cut -d':' -f2- | sed -E 's/.*T([0-9]{2}:[0-9]{2}).*/\1/')
  local geoLocation=$(grep "^geoLocation:" "$log_file" | cut -d':' -f2- | sed -E 's/.*T([0-9]{2}:[0-9]{2}).*/\1/')
  local airQuality=$(grep "^airQuality:" "$log_file" | cut -d':' -f2- | sed -E 's/.*T([0-9]{2}:[0-9]{2}).*/\1/')

  echo -e "Last sync:☁️ ${weather:-N/A} | 🌬️ ${airQuality:-N/A} | 📍 ${geoLocation:-N/A}"
}

get_weather() {
  local temp_with_icon=$(get_temperature)
  local wind=$(get_wind_condition)
  local pressure=$(get_mmhg_pressure)
  local aqi=$(get_aqi)
  local location=$(get_location)

  echo -e "$temp_with_icon | $wind\n$pressure\n$aqi\n$location"
}

is_night() {
  local sunrise_ts=$(date -d "$1" +%s)
  local sunset_ts=$(date -d "$2" +%s)
  local now_ts=$(date +%s)
  if ((now_ts < sunrise_ts || now_ts > sunset_ts)); then
    return 0 # It is night
  else
    return 1 # It is day
  fi
}

get_weather_icon() {
  local coordinates=$(get_coordinates)
  if [ -z "$coordinates" ]; then
    echo "❓"
    return
  fi
  local latitude=${coordinates%%,*}
  local longitude=${coordinates##*,}
  local api_response=""
  if [ -n "$latitude" ] && [ -n "$longitude" ]; then
    api_response=$(fetch_weather_data "$latitude" "$longitude")
  fi

  local weathercode=$(echo "$api_response" | jq -r '.current_weather.weathercode')
  local sunrise=$(echo "$api_response" | jq -r '.daily.sunrise[0]')
  local sunset=$(echo "$api_response" | jq -r '.daily.sunset[0]')

  if [ -z "$weathercode" ]; then
    echo "❓"
    return
  fi

  local night_flag=1 # Default to day
  if is_night "$sunrise" "$sunset"; then
    night_flag=0 # It is night
  fi

  case "$weathercode" in
  0) [[ "$night_flag" -eq 0 ]] && echo "🌕" || echo "☀️" ;;
  1 | 2) [[ "$night_flag" -eq 0 ]] && echo "🌙" || echo "🌤️" ;;
  3) echo "☁️" ;;
  45 | 48) echo "🌫️" ;;
  51 | 53 | 55) echo "🌦️" ;;
  61 | 63 | 65 | 80 | 81 | 82) echo "🌧️" ;;
  66 | 67 | 71 | 73 | 75 | 77) echo "🌨️" ;;
  95 | 96 | 99) echo "⛈️" ;;
  *) echo "❓" ;;
  esac
}

# --- Command-line Argument Parsing ---

show_help() {
  echo "Usage: weather.sh [COMMAND]"
  echo
  echo "Commands:"
  echo "  --weather         Display full weather summary."
  echo "  --temperature     Get the current temperature with weather icon."
  echo "  --wind            Get the current wind condition."
  echo "  --aqi             Get the Air Quality Index."
  echo "  --pressure        Get the atmospheric pressure in mmHg."
  echo "  --location        Get the current location."
  echo "  --updated         Get the last updated times."
  echo "  --help            Show this help message."
  echo
  echo "If no command is provided, a full weather summary is displayed."
}

if [ -z "$1" ]; then
  get_weather
  exit 0
fi

case "$1" in
--weather)
  get_weather
  ;;
--temperature)
  get_temperature
  ;;
--wind)
  get_wind_condition
  ;;
--aqi)
  get_aqi
  ;;
--pressure)
  get_mmhg_pressure
  ;;
--location)
  get_location
  ;;
--updated)
  get_last_updated_times
  ;;
--help)
  show_help
  ;;
*)
  echo "Invalid command: $1"
  show_help
  exit 1
  ;;
esac
