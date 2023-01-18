import sys
import os
import threading
import json

pdfListC = []
pdfListD = []
pdfListE = []
pdfListF = []
pdfListG = []
pdfDict = {}


def getPdfs(root, array):
    path = os.path.join(root, "")
    for path, subdirs, files in os.walk(root):
        for name in files:
            filename = os.path.join(path, name)
            if (filename.endswith('pdf')):
                try:
                    size = os.path.getsize(filename)
                except:
                    size = -1
                array.append((name, filename, size))


def find_duplicates(array):
    for pdf, path, fileSize in array:
        pdfValues = pdfDict.get(pdf)
        if pdfValues:
            paths = pdfValues['path']
            fileSizeArray = pdfValues['size']
            dupeCount = pdfValues['dupeCount'] + 1
        else:
            paths = []
            fileSizeArray = []
            dupeCount = 0

        paths.append(path)
        fileSizeArray.append(fileSize)
        pdfDict[pdf] = {'path': paths,
                        'size': fileSizeArray, 'dupeCount': dupeCount}


        # creating thread
t1 = threading.Thread(target=getPdfs, args=("C:\\", pdfListC,))
t2 = threading.Thread(target=getPdfs, args=("D:\\", pdfListD,))
t3 = threading.Thread(target=getPdfs, args=("E:\\", pdfListE,))
t4 = threading.Thread(target=getPdfs, args=("F:\\", pdfListF,))
t5 = threading.Thread(target=getPdfs, args=("G:\\", pdfListG,))


# starting threads
t1.start()
t2.start()
t3.start()
t4.start()
t5.start()

# wait until thread is completely executed
t1.join()
t2.join()
t3.join()
t4.join()
t5.join()

find_duplicates(pdfListC)
find_duplicates(pdfListD)
find_duplicates(pdfListE)
find_duplicates(pdfListF)
find_duplicates(pdfListG)


json_object = json.dumps(pdfDict, indent=2)
with open("./myPdfList.json", "w") as outfile:
    json.dump(pdfDict, outfile)
