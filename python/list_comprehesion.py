# List comprehension:
# Comprehension = construction a list from an existing list
# Covers:
# - for loops
# - conditionals
# - strings

###
# eg 1 - list of fruits
fruits = ["apples", "bananas", "strawberries"]
for fruit in fruits:
    print(fruits)
# with list comprehension
[print(fruit) for fruit in fruits]

###
# eg 2 - uppercase fruit list
new_fruits = []
for fruit in fruits:
    fruit = fruit.upper()
    new_fruits.append(fruit)
print(new_fruits)
# with list comprehension
fruits = [f.upper() for f in fruits]
print(fruits)

###
# eg 3 - list of boolean values representing bits
bits = [False, True, False, False, True, True, False]
new_bits = []
for b in bits:
    if b == True:
        new_bits.append(1)
    else:
        new_bits.append(0)
print(new_bits)
# with list comprehension
bits = [1 if b == True else 0 for b in bits]
print(bits)

###
# eg 4 - string manipulation: "HelloMyDearFriend" => "Hello My Dear Friend"
# tips: you should combine it with join because each char will be an array item
my_string = "HelloMyDearFriend"
my_string = "".join(
    [i if i.islower() else " " + i for i in my_string]
)[1:]
# [1:] - starting your string from 2nd char as we put a space on start of sentence
print(my_string)
