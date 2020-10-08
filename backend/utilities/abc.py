import json
# from django.http import JsonResponse 
from django.http import HttpResponse


data1 = open('../static/KakaoTalk_20201005_134657409.jpg.json')
# print(type(data1))
data2 = json.load(data1)
print(type(data2))
print(data2)


# data3 = JsonResponse(data2)

data3 = HttpResponse(data2)
# HttpResponse
print(data3)