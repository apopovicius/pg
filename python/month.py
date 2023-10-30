from calendar import month
from datetime import datetime

now = datetime.now()
y, m = now.year, now.month

print(month(y, m))

#    October 2023
#Mo Tu We Th Fr Sa Su
#                   1
# 2  3  4  5  6  7  8
# 9 10 11 12 13 14 15
#16 17 18 19 20 21 22
#23 24 25 26 27 28 29
#30 31