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
from botocore.exceptions import ClientError
import logging

import json

# json return
# from django.http import HttpResponse

# test
from django.shortcuts import render, redirect
def index(request):
    return render(request, 'index.html')



AWS_ACCESS_KEY_ID = "AKIAIVPM3UIRJJ47XPNQ"
AWS_SECRET_ACCESS_KEY = "fcgaW5EEGV6P5d35xh5RzllOPDUouS4n+AaSMFzJ"
AWS_DEFAULT_REGION = "ap-northeast-2"
AWS_BUCKET_NAME = "pack-man"
# import xmltodict
# import json

# Create your views here.

@api_view(['POST'])
def detect(request):
    url = request.data.get('url')
    print('url :', url)

    ## count
    cnt = len('https://pack-man.s3.ap-northeast-2.amazonaws.com/')
    filename = url[cnt:]
    print('file :', filename)

    storage = "> ../AI/yolov5/inference/images/" + filename
    print("Storage : " + storage)
    os.system("curl " + url + storage)
    os.system("python ../AI/yolov5/detect.py")
    #aifile = 
    print('0000000000000000000000000000000000000000000000000000000')
    ###############################

    fileurl = "../backend/static/" + filename
    
    new_fileurl = 'https://pack-man.s3.ap-northeast-2.amazonaws.com/new' + filename
    new_filename = 'new' + filename

    # S3 Client 생성
    s3 = boto3.client('s3')

    # 업로드할 S3 버킷
    bucket_name = 'pack-man'

    # 첫본째 매개변수 : 로컬에서 올릴 파일이름
    # 두번째 매개변수 : S3 버킷 이름
    # 세번째 매개변수 : 버킷에 저장될 파일 이름.
    s3.upload_file(fileurl, bucket_name, new_filename, ExtraArgs={'ACL':'public-read'})

    # os.system("curl " + url + " > ../AI/yolov5/inference/images/a.jpg")

    dicurlname = fileurl + '.json'
    try:
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
    except:
        final_list = ["아무것도 없어용"]
    # print(final_list)

    # "socks", 양말
    # "ballcap", 모자
    # "hoody", 후드
    # "pants", 바지
    # "hair dryer", 드라이기
    # "mask", 마스크
    # "charger", 충전기
    # "backpack", 가방
    # "T-shirt", 티셔츠

    return Response(data={"stuff_list": final_list, "new_url" : new_fileurl})

    # encoded_jwt = jwt.encode(
    #     {"pk": user.pk}, settings.SECRET_KEY, algorithm="HS256"
    # )
    # return Response(data={"token": encoded_jwt, "id": user.pk})