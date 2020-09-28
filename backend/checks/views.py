from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import CheckListSerializer, CheckSerializer
from .models import Check_list

@api_view(['GET'])
def check_list(request):
    # from ipware.ip import get_ip
    # ip = get_ip(request)
    # if ip is not None:
    #     print("찾았다")
    # else:
    #     print("못찾았다")
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    print(ip)


    import urllib.parse
    import urllib.request
    from urllib.request import urlopen
    import json
    import requests
    url = 'http://ip-api.com/json'

    # req = urllib.request.Request(url)
    # print(req)

    data = requests.get(url)

    res = data.json()
    # response_body = urlopen(req, timeout=60).read() # get bytes data
    # data = json.loads(req)	# convert bytes data to json data
    print(res)
    # response_body = urlopen(request, timeout=60).read() # get bytes data
    # print(response_body)

    checks = Check_list.objects.all()
    serializer = CheckListSerializer(checks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def check_detail(request, check_pk):
    check = get_object_or_404(Check_list, pk=check_pk)
    serializer = CheckSerializer(check)
    return Response(serializer.data)

@api_view(['POST'])
def create_check(request):
    serializer = CheckSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)  # NOT NULL CONSTRAINT FAILD
        return Response(serializer.data)