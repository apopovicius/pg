#!/bin/bash

song_info=""
ICON_GENERIC="\uf001"
ICON_SPOTIFY="\uf1bc"
ICON_SOUNDCLOUD="\uf0c2"
ICON_YOUTUBE="\uf166"
max_lenght=60

for player in $(playerctl -l); do
    status=$(playerctl -p "$player" status 2>/dev/null)
    if [ "$status" == "Playing" ]; then
        artist=$(playerctl -p "$player" metadata artist 2>/dev/null)
        title=$(playerctl -p "$player" metadata title 2>/dev/null)
        url=$(playerctl -p "$player" metadata xesam:url 2>/dev/null)
        short_title="${title:0:$max_lenght}"

        if [ -n "$title" ] || [ -n "$artist" ]; then
            icon="$ICON_GENERIC" # generic icon
            if [[ "$player" == "spotify" || "$url" == *"spotify"* ]]; then
                icon="$ICON_SPOTIFY"
            elif [[ "$url" == *"soundcloud"* ]]; then
                icon="$ICON_SOUNDCLOUD"
            elif [[ "$url" == *"youtube.com"* || "$url" == *"youtu.be"* ]]; then
                icon="$ICON_YOUTUBE"
            fi

            song_info="$icon $artist - $short_title"
            if [ "$icon" == "$ICON_YOUTUBE" ]; then
                song_info="$icon $short_title" # no need to display the author of video in case of YT
            fi
            echo -e "$song_info"
            exit 0
        fi
    fi
done

echo -e "$song_info"
