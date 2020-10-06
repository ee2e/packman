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


import json

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
    print("Storage : " + storage)
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
    print(type(data))
    print(data)
    print(data['labels'])
    print(data['labels'][0])

    final_list = []
    input_list = [
        "socks",
        "ballcap",
        "hoody",
        "pants",
        "hair dryer",
        "mask",
        "charger",
        "backpack",
        "T-shirt"
    ]
    outlist_list = [
        '양말', 
        '모자', 
        '후드', 
        '바지', 
        '드라이기', 
        '마스크', 
        '충전기', 
        '가방', 
        '티셔츠'
    ]

    if data['labels']:
        for label in data['labels']:
            for i in range(len(input_list)):
                if label == input_list[i]:
                    final_list.append(outlist_list[i])
    print(final_list)

#     "socks", 양말
# "ballcap", 모자
# "hoody", 후드
# "pants", 바지
# "hair dryer", 드라이기
# "mask", 마스크
# "charger", 충전기
# "backpack", 가방
# "T-shirt", 티셔츠



    return Response(data={"stuff_list": final_list})


    # encoded_jwt = jwt.encode(
    #     {"pk": user.pk}, settings.SECRET_KEY, algorithm="HS256"
    # )
    # return Response(data={"token": encoded_jwt, "id": user.pk})
