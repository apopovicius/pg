# Instructions
# Your task is to convert a number into a string that contains raindrop sounds corresponding to certain potential factors. A factor is a number that evenly divides into another number, leaving no remainder. The simplest way to test if one number is a factor of another is to use the modulo operation.

# The rules of raindrops are that if a given number:

# has 3 as a factor, add 'Pling' to the result.
# has 5 as a factor, add 'Plang' to the result.
# has 7 as a factor, add 'Plong' to the result.
# does not have any of 3, 5, or 7 as a factor, the result should be the digits of the number.

# Examples
# 28 has 7 as a factor, but not 3 or 5, so the result would be "Plong".
# 30 has both 3 and 5 as factors, but not 7, so the result would be "PlingPlang".
# 34 is not factored by 3, 5, or 7, so the result would be "34".

#!/bin/sh
main () {
    # your main function code here
    STR=''
    CONVERT=true
    if [ $(expr $1 % 3) -eq "0" ]; then
        STR+="Pling"
        CONVERT=false
    fi
    if [ $(expr $1 % 5) -eq "0" ]; then
        STR+="Plang"
        CONVERT=false
    fi
    if [ $(expr $1 % 7) -eq "0" ]; then
        STR+="Plong"
        CONVERT=false
    fi
    if $CONVERT; then
        STR+=$1
    fi
    echo $STR
}

# call main with all of the positional arguments
main "$@"


# V2
## Usage: raindrops.sh <number>
#(($1%3==0)) && output+=Pling
#(($1%5==0)) && output+=Plang
#(($1%7==0)) && output+=Plong
#echo ${output:-$1}



# V3
#n=$1
#declare -a divisors=(
#    [3]=Pling
#    [5]=Plang
#    [7]=Plong
#)
#out=""
#for i in "${!divisors[@]}"; do
#    if ((n%i == 0)); then
#        out="${out}${divisors[$i]}"
#    fi
#done
#if [[ -z "$out" ]]; then
#    echo "$n"
#else
#    echo "$out"
#fi


# v4 - FUNCTION SAMPLE
# function addIfDivisable {
#     if [ $(expr $1 % $2) == 0 ]
#         then
#             result+=$3
#     fi
# }
# addIfDivisable $1 3 'Pling'
# addIfDivisable $1 5 'Plang'
# addIfDivisable $1 7 'Plong'
# echo ${result:-$1}