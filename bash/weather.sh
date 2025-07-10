#!/bin/bash

# --- API Configuration ---
readonly GEOLOCATION_APIS=(
  "https://ipinfo.io"
  "http://ip-api.com/json"
  "https://reallyfreegeoip.org/json/"
  "https://freegeoip.app/json/"
  "https://api.bigdatacloud.net/data/ip-geolocation-full"
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
      local api_name=$(echo "$api_url" | sed -E 's/https?:\/\///' | cut -d'/' -f1)
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
  local api_name="$1"
  local raw_api_response="$2"
  local loc=""
  local city=""
  local country=""

  if [[ "$api_name" =~ ^(ipinfo.io|reallyfreegeoip.org|freegeoip.app)$ ]]; then
    loc=$(echo "$raw_api_response" | jq -r '.loc' 2>/dev/null)
    city=$(echo "$raw_api_response" | jq -r '.city' 2>/dev/null)
    country=$(echo "$raw_api_response" | jq -r '.country' 2>/dev/null)
  elif [ "$api_name" = "ip-api.com" ]; then
    local status=$(echo "$raw_api_response" | jq -r '.status' 2>/dev/null)
    if [ "$status" = "success" ]; then
      local lat=$(echo "$raw_api_response" | jq -r '.lat' 2>/dev/null)
      local lon=$(echo "$raw_api_response" | jq -r '.lon' 2>/dev/null)
      loc="$lat,$lon"
      city=$(echo "$raw_api_response" | jq -r '.city' 2>/dev/null)
      country=$(echo "$raw_api_response" | jq -r '.country' 2>/dev/null)
    fi
  elif [ "$api_name" = "api.bigdatacloud.net" ]; then
    local lat=$(echo "$raw_api_response" | jq -r '.latitude' 2>/dev/null)
    local lon=$(echo "$raw_api_response" | jq -r '.longitude' 2>/dev/null)
    if [ -n "$lat" ] && [ -n "$lon" ]; then
      loc="$lat,$lon"
      city=$(echo "$raw_api_response" | jq -r '.city' 2>/dev/null)
      country=$(echo "$raw_api_response" | jq -r '.countryName' 2>/dev/null)
    fi
  fi

  # Return a consistent JSON structure
  echo "{\"loc\":\"$loc\",\"city\":\"$city\",\"country\":\"$country\"}"
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

    api_name=$(echo "$api_url" | sed -E 's/https?:\/\///' | cut -d'/' -f1) # Ensure api_name is set here
    echo "DEBUG: Attempting geolocation API-URL: $api_url)" >&2
    raw_api_response=$("$(dirname "$0")/cached-fetch.sh" --url "$api_url" --cache-name "geoLocation" --ttl 21600)
    exit_code=$?
    echo "DEBUG: cached-fetch.sh exit code for $api_url: $exit_code" >&2

    if [ "$exit_code" -eq 0 ]; then
      # API call successful, format and check if coordinates_string is valid
      standardized_geo_json=$(standardize_geo_data "$api_name" "$raw_api_response")
      coordinates_string=$(echo "$standardized_geo_json" | jq -r '.loc' 2>/dev/null)

      if [ -n "$coordinates_string" ] && [ "$coordinates_string" != "null" ]; then
        echo "$standardized_geo_json"
        return 0 # Successfully fetched and parsed location, exit function
      else
        # Data was fetched, but 'coordinates_string' is invalid, blacklist API and try next
        geo_api_selector "blacklist" "$api_name"
        # Continue to next iteration of the loop
      fi
    else
      # cached-fetch.sh indicated a failure (exit code 1 or 2), blacklist API and try next
      geo_api_selector "blacklist" "$api_name"
      # Continue to next iteration of the loop
    fi
  done

  echo "" # All APIs tried and failed, return empty
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
  local standardized_geo_json=$(fetch_location_data)
  local coordinates_string=""
  if [ -n "$standardized_geo_json" ]; then
    coordinates_string=$(echo "$standardized_geo_json" | jq -r '.loc' 2>/dev/null)
  fi

  if [ -n "$coordinates_string" ] && [ "$coordinates_string" != "null" ]; then
    echo "${coordinates_string%%,*},${coordinates_string##*,}"
    return 0
  else
    echo ""
    return 1
  fi
}

get_location() {
  local standardized_geo_json=$(fetch_location_data)
  local city=""
  local country=""
  if [ -n "$standardized_geo_json" ]; then
    city=$(echo "$standardized_geo_json" | jq -r '.city' 2>/dev/null)
    country=$(echo "$standardized_geo_json" | jq -r '.country' 2>/dev/null)
  fi

  if [ -z "$city" ] || [ -z "$country" ]; then
    echo "📍 N/A"
  else
    echo "📍 $city, $country"
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
  local temperature=$(echo "$api_response" | jq -r '.current_weather.temperature')
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
    echo "💨 N/A km/h"
    return
  fi
  local latitude=${coordinates%%,*}
  local longitude=${coordinates##*,}
  local api_response=""
  if [ -n "$latitude" ] && [ -n "$longitude" ]; then
    api_response=$(fetch_weather_data "$latitude" "$longitude")
  fi
  local windspeed=$(echo "$api_response" | jq -r '.current_weather.windspeed')
  if [ -z "$windspeed" ]; then
    echo "💨 N/A km/h"
  else
    echo "💨 ${windspeed} km/h"
  fi
}

get_aqi() {
  local coordinates=$(get_coordinates)
  if [ -z "$coordinates" ]; then
    echo "Air Quality: N/A"
    return
  fi
  local latitude=${coordinates%%,*}
  local longitude=${coordinates##*,}
  local api_response=""
  if [ -n "$latitude" ] && [ -n "$longitude" ]; then
    api_response=$(fetch_aq_data "$latitude" "$longitude")
  fi
  local aqi=$(echo "$api_response" | jq -r '.hourly.us_aqi[0]') # Assuming we want the first hour's AQI
  if [ -z "$aqi" ]; then
    echo "Air Quality: N/A"
    return
  fi
  if [ "$aqi" -le 50 ]; then
    echo "🟢 Air Quality: $aqi (Good)"
  elif [ "$aqi" -le 100 ]; then
    echo "🟡 Air Quality: $aqi (Moderate)"
  elif [ "$aqi" -le 150 ]; then
    echo "🟠 Air Quality: $aqi (Unhealthy for Sensitive)"
  elif [ "$aqi" -le 200 ]; then
    echo "🔴 Air Quality: $aqi (Unhealthy)"
  elif [ "$aqi" -le 300 ]; then
    echo "🟣 Air Quality: $aqi (Very Unhealthy)"
  else
    echo "⚫ Air Quality: $aqi (Hazardous)"
  fi
}

get_mmhg_pressure() {
  local coordinates=$(get_coordinates)
  if [ -z "$coordinates" ]; then
    echo "🌬️ N/A mmHg"
    return
  fi
  local latitude=${coordinates%%,*}
  local longitude=${coordinates##*,}
  local api_response=""
  if [ -n "$latitude" ] && [ -n "$longitude" ]; then
    api_response=$(fetch_weather_data "$latitude" "$longitude")
  fi
  local pressure_hpa=$(echo "$api_response" | jq -r '.hourly.pressure_msl[0]') # Assuming first hour
  if [ -z "$pressure_hpa" ]; then
    echo "🌬️ N/A mmHg"
    return
  fi
  local pressure_mmhg=$(awk "BEGIN { printf \"%.0f\", $pressure_hpa * 0.75006 }")
  if ((pressure_mmhg < 740)); then
    echo "🌬️ $pressure_mmhg mmHg (🔽 Low)"
  elif ((pressure_mmhg > 770)); then
    echo "🌬️ $pressure_mmhg mmHg (🔼 High)"
  else
    echo "🌬️ $pressure_mmhg mmHg (✅ Normal)"
  fi
}

get_last_updated_times() {
  local log_file="/tmp/cache_fetch_last_update"
  if [ ! -f "$log_file" ]; then
    return
  fi

  local weather=$(grep "^weather:" "$log_file" | cut -d':' -f2- | sed 's/.*T//')
  local geoLocation=$(grep "^geoLocation:" "$log_file" | cut -d':' -f2- | sed 's/.*T//')
  local airQuality=$(grep "^airQuality:" "$log_file" | cut -d':' -f2- | sed 's/.*T//')

  echo "Updated: W(${weather:-N/A}) A(${airQuality:-N/A}) L(${geoLocation:-N/A})"
}

get_weather() {
  local temp_with_icon=$(get_temperature)
  local wind=$(get_wind_condition)
  local pressure=$(get_mmhg_pressure)
  local aqi=$(get_aqi)
  local location=$(get_location)
  local last_updated=$(get_last_updated_times)

  echo -e "$temp_with_icon | $wind\n$pressure\n$aqi\n$location\n$last_updated"
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
--help)
  show_help
  ;;
*)
  echo "Invalid command: $1"
  show_help
  exit 1
  ;;
esac
