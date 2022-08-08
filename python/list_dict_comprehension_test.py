my_movies = ['How I Met Your Mother', 'Friends', 'Silicon Valley', 'Family Guy', 'South Park', 'Rick and Morty', 'Breaking Bad', 'Game of Thrones', 'The Wire']
print(my_movies)
print( [movie for movie in my_movies if movie[0]!='F'] )

dict = {'apple': 'fruit', 'beetroot': 'vegetable', 'cake': 'dessert'}
dict['doughnut'] = 'snack'
print(dict)
print(dict['apple'])
my_snack = lambda val: val == 'snack' in dict.values
print(my_snack)
print( { key:value for (key,value) in dict.items()} )
print( { key for key in dict.keys()} )
print( { values for values in dict.values()} )
print( { key:value for (key,value) in dict.items() if value is 'fruit'} )

#Initialize `fahrenheit` dictionary 
fahrenheit = {'t1':-30, 't2':-20, 't3':-10, 't4':0}

#Get the corresponding `celsius` values
celsius = list(map(lambda x: (float(5)/9)*(x-32), fahrenheit.values()))
print(celsius)
#v2 celsius dict
celsiusV2 = {k:(float(5)/9)*(v-32) for (k,v) in fahrenheit.items()}

#Create the `celsius` dictionary
print(celsiusV2)

