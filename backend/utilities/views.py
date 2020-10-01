from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
import requests
# import xmltodict
# import json

# Create your views here.

@api_view(['POST'])
def detect(request):
    url = request.POST.get('url')
    print(url)
    return HttpResponse("OK")