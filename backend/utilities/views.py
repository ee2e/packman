from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
import requests

# 이미지 저장 로직
import time
import os

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

    # os.system("curl " + url + " > ../AI/yolov5/inference/images/a.jpg")
    return HttpResponse("OK")

    # C:\Users\multicampus\Desktop\ach\s03p23d208\AI\yolov5\inference\images
    # AI\yolov5\inference\images

# def travelweather(request):


# def nowweather(request):