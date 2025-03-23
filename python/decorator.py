import time

def performance_decorator(func):
    def wrapper():
        start = time.time()
        func()
        end = time.time()
        print(f"{func.__name__} executed in {end-start} ms")
    return wrapper

@performance_decorator
def my_func1():
    time.sleep(0.5)
    print("this is my function 1")

@performance_decorator
def my_func2():
    time.sleep(1)
    print("this is my function 2")


my_func1()
my_func2()
