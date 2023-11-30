import time
start = time.time()
num = 0
while num < 100000000:
    num += 1
stop = time.time()
print('to count to 100.000.000 it took: %s seconds', stop-start);
print(num)