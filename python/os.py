import os 
with open(os.path.join("exists.out"), 'r') as fh:
            if "xchtmlreport" not in fh.readline().strip("\n").lower():
                print("NOT exist")
            else:
                print("exist")
