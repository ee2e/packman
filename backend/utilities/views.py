from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
import requests

# 이미지 저장 로직
import time
import os


#s3
import boto3


# json return
# from django.http import HttpResponse

# test
from django.shortcuts import render, redirect
def index(request):
    return render(request, 'index.html')



AWS_ACCESS_KEY_ID = "AKIA3IDIIPPFDKAGJHHJ"
AWS_SECRET_ACCESS_KEY = "H/oPJPxKDwWZ2HUIDlr1QWbUnvWUBtMtBWBddCrL"
AWS_DEFAULT_REGION = "ap-northeast-2"
AWS_BUCKET_NAME = "packmanpy"
# import xmltodict
# import json

# Create your views here.

@api_view(['POST'])
def detect(request):
    url = request.data.get('url')
    print(url)
    start = str(int(time.time()))
    print(start)
    storage = "> ../AI/yolov5/inference/images/" + start + ".jpg"
    print(storage)
    os.system("curl " + url + storage)
    os.system("python ../AI/yolov5/detect.py")
    #aifile = 
    print('0000000000000000000000000000000000000000000000000000000')
    ###############################
    
    # os.remove("../AI/yolov5/inference/images/" + start + ".jpg")


    # ap-northeast-2
    s3 = boto3.client('s3')
    filename = start + ".jpg"
    fileurl = "../backend/static/"+filename
    bucket_name = 'packmanpy'
    s3.upload_file(fileurl, bucket_name, filename)
    # os.system("curl " + url + " > ../AI/yolov5/inference/images/a.jpg")




    dicurlname = fileurl + '.json'
    dicurl = open(dicurlname)
    data = json.load(dicurl)



    return HttpResponse(data)
