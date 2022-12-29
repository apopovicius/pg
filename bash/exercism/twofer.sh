#!/bin/bash
# short hand
# echo "One for ${1-you}, one for me."

#my solution
if [ -z "$1" ]
then
    echo "One for you, one for me."
else
    echo "One for $1, one for me."
fi