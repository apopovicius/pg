#!/usr/bin/env bash

# The following comments should help you get started:
# - Bash is flexible. You may use functions or write a "raw" script.
#
# - Complex code can be made easier to read by breaking it up
#   into functions, however this is sometimes overkill in bash.
#
# - You can find links about good style and other resources
#   for Bash in './README.md'. It came with this exercise.
#
#   Example:
#   # other functions here
#   # ...
#   # ...
#
#   main () {
#     # your main function code here
#   }
#
#   # call main with all of the positional arguments
#   main "$@"
#
# *** PLEASE REMOVE THESE COMMENTS BEFORE SUBMITTING YOUR SOLUTION ***
if [ "$#" -eq "1" ]; then
    echo "Greetings"
else
    echo "Error!!!"
    exit 1
fi


#short hand v1
#usage="Usage: $(basename $0) <person>"
#[ $# -ne 1 ] && { echo $usage; exit 1; }
#echo, Hello "$*"

#short hand v2
#[ $# -ne 1 ] && echo "Usage: $0 <person>" && exit 1
#echo "Hello, $1"