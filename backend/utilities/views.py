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
    os.remove("../AI/yolov5/inference/images/" + start + ".jpg")


    # ap-northeast-2
    s3 = boto3.client('s3')
    filename = start + ".jpg"
    fileurl = "../backend/static/"+filename
    bucket_name = 'packmanpy'
    s3.upload_file(fileurl, bucket_name, filename)
    # os.system("curl " + url + " > ../AI/yolov5/inference/images/a.jpg")

    os.remove(fileurl)
    # AWS_ACCESS_KEY_ID = "AKIA3IDIIPPFDKAGJHHJ"
    # AWS_SECRET_ACCESS_KEY = "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"
    # AWS_DEFAULT_REGION = "ap-northeast-2"
    # AWS_BUCKET_NAME = "packmanpy"



    # BASE_DIR = os.getcwd()
    #IMAGE_DIR = os.path.join(BASE_DIR, 'images')


#     client = boto3.client('s3',
#                         aws_access_key_id=AWS_ACCESS_KEY_ID,
#                         aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
#                         region_name=AWS_DEFAULT_REGION
#                         )
#     s3 = boto3.resource('s3')

#     buckets = s3.Bucket(name=AWS_BUCKET_NAME)

# #    file_path = os.path.join(fileurl, filename)
#     # 저장될 데이터의 이름 -> key로 사용
#     key_name = filename

#     # upload_file(image파일 주소, 저장될 파일 이름)
#     # buckets.upload_file(file_path, 'mcpro.png')

#     # with open(file_path, 'rb') as data:
#     buckets.upload_file(fileurl, key_name)

    return HttpResponse("OK")

    # C:\Users\multicampus\Desktop\ach\s03p23d208\AI\yolov5\inference\images
    # AI\yolov5\inference\images

# def travelweather(request):


# def nowweather(request):