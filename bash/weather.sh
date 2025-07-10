#!/bin/bash

# Source the fetch utility
source "$(dirname "$0")/cached-fetch.sh"

# --- API Configuration ---
readonly LOCATION_API="https://ipinfo.io"
readonly WEATHER_API="https://api.open-meteo.com/v1/forecast"
readonly AQ_API="https://air-quality-api.open-meteo.com/v1/air-quality"

# --- Data Fetching and Caching ---

get_location_data() {
  cached-fetch.sh --url "$LOCATION_API" --cache-name "ipinfo" --ttl 21600 # Cache for 6 hours
}

get_weather_data() {
  local lat="$1"
  local lon="$2"
  local url="$WEATHER_API?latitude=$lat&longitude=$lon&current_weather=true&daily=sunrise,sunset&hourly=pressure_msl&timezone=auto"
  cached-fetch.sh --url "$url" --cache-name "weather" --ttl 900 # Cache for 15 minutes
}

get_aq_data() {
  local lat="$1"
  local lon="$2"
  local url="$AQ_API?latitude=$lat&longitude=$lon&hourly=us_aqi&timezone=auto"
  cached-fetch.sh --url "$url" --cache-name "air-quality" --ttl 1800 # Cache for 30 minutes
}

# --- Helper Functions ---

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

get_last_updated_times() {
  local log_file="/tmp/cache_fetch_last_update"
  if [ ! -f "$log_file" ]; then
    echo "Updated: Not available"
    return
  fi

  local weather_time=$(grep "^weather:" "$log_file" | cut -d':' -f2- | sed 's/.*T//')
  local ipinfo_time=$(grep "^ipinfo:" "$log_file" | cut -d':' -f2- | sed 's/.*T//')
  local aq_time=$(grep "^air-quality:" "$log_file" | cut -d':' -f2- | sed 's/.*T//')

  echo "Updated: W(${weather_time:-N/A}) L(${ipinfo_time:-N/A}) A(${aq_time:-N/A})"
}

# --- Individual Data Commands ---

get_location() {
  local ipinfo_json=$(get_location_data)
  local city=$(echo "$ipinfo_json" | jq -r '.city')
  local country=$(echo "$ipinfo_json" | jq -r '.country')
  echo "📍 $city, $country"
}

get_weather_icon() {
  local ipinfo_json=$(get_location_data)
  local loc=$(echo "$ipinfo_json" | jq -r '.loc')
  local latitude=${loc%%,*}
  local longitude=${loc##*,}
  local weather_json=$(get_weather_data "$latitude" "$longitude")

  local weathercode=$(echo "$weather_json" | jq -r '.current_weather.weathercode')
  local sunrise=$(echo "$weather_json" | jq -r '.daily.sunrise[0]')
  local sunset=$(echo "$weather_json" | jq -r '.daily.sunset[0]')

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

get_temperature() {
  local ipinfo_json=$(get_location_data)
  local loc=$(echo "$ipinfo_json" | jq -r '.loc')
  local latitude=${loc%%,*}
  local longitude=${loc##*,}
  local weather_json=$(get_weather_data "$latitude" "$longitude")
  local temperature=$(echo "$weather_json" | jq -r '.current_weather.temperature')
  local icon=$(get_weather_icon)
  echo "$icon ${temperature}°C"
}

get_wind_condition() {
  local ipinfo_json=$(get_location_data)
  local loc=$(echo "$ipinfo_json" | jq -r '.loc')
  local latitude=${loc%%,*}
  local longitude=${loc##*,}
  local weather_json=$(get_weather_data "$latitude" "$longitude")
  local windspeed=$(echo "$weather_json" | jq -r '.current_weather.windspeed')
  echo "💨 ${windspeed} km/h"
}

get_aqi() {
  local ipinfo_json=$(get_location_data)
  local loc=$(echo "$ipinfo_json" | jq -r '.loc')
  local latitude=${loc%%,*}
  local longitude=${loc##*,}
  local aq_json=$(get_aq_data "$latitude" "$longitude")
  local aqi=$(echo "$aq_json" | jq -r '.hourly.us_aqi[0]') # Assuming we want the first hour's AQI

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
  local ipinfo_json=$(get_location_data)
  local loc=$(echo "$ipinfo_json" | jq -r '.loc')
  local latitude=${loc%%,*}
  local longitude=${loc##*,}
  local weather_json=$(get_weather_data "$latitude" "$longitude")
  local pressure_hpa=$(echo "$weather_json" | jq -r '.hourly.pressure_msl[0]') # Assuming first hour
  local pressure_mmhg=$(awk "BEGIN { printf \"%.0f\", $pressure_hpa * 0.75006 }")

  if ((pressure_mmhg < 740)); then
    echo "🌬️ $pressure_mmhg mmHg (🔽 Low)"
  elif ((pressure_mmhg > 770)); then
    echo "🌬️ $pressure_mmhg mmHg (🔼 High)"
  else
    echo "🌬️ $pressure_mmhg mmHg (✅ Normal)"
  fi
}

# --- Main Function ---

get_weather() {
  local temp_with_icon=$(get_temperature)
  local wind=$(get_wind_condition)
  local pressure=$(get_mmhg_pressure)
  local aqi=$(get_aqi)
  local location=$(get_location)
  local last_updated=$(get_last_updated_times)

  echo -e "$temp_with_icon | $wind\n$pressure\n$aqi\n$location\n$last_updated"
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