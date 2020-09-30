from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# from .serializers import CheckListSerializer, CheckSerializer, StuffSerializer, PictureSetSerializer
# from .models import Check_list

# @api_view(['GET'])
# def check_list(request):
#     checks = Check_list.objects.all()
#     serializer = CheckListSerializer(checks, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def check_detail(request, check_pk):
#     check = get_object_or_404(Check_list, pk=check_pk)
#     serializer = CheckSerializer(check)
#     return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_check(request):
#     serializer = CheckSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(user=request.user)  # NOT NULL CONSTRAINT FAILD #user_id=1 
#         return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_list(request):
#     serializer = StuffSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(commit=False)  # NOT NULL CONSTRAINT FAILD #user_id=1 
#         return Response(serializer.data)

# @api_view(['POST'])
# def getpicture(request):
#     serializer = PictureSetSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(commit=False)  # NOT NULL CONSTRAINT FAILD #user_id=1 
#         return Response(serializer.data)
