import re
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
import os 
import random
# Create your views here.
def getinfo(request):
    return HttpResponse('getinfo')

def file_up(request):
    if request.method == "POST":
        print(1111)
        # 获取上传的文件，如果没有文件，则默认为None
        # print(request.body)
        myFile = request.FILES.get("File",None)#filename为input的name值
        print(123)
        if myFile == None:
            print(2222)
            return HttpResponse('没有文件')
        else:
            print(myFile.file)
            print(myFile.name)
            print(myFile.size)
            with open('E:/桌面/项目/myproject/sw/media/'+myFile.name, 'wb+') as destination:
                for chunk in myFile.chunks():
                    print(type(chunk))
                    destination.write(chunk)
        # 打开特定的文件进行二进制的写操作
            return HttpResponse(myFile.size)

def file_download(request):
    return HttpResponse('file_download')

def index(request):
    return HttpResponseRedirect("static/index.html")