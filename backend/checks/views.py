# from django.shortcuts import get_object_or_404
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated

# # from .serializers import CheckListSerializer, CheckSerializer, StuffSerializer, PictureSetSerializer
# # from .models import Check_list

# # @api_view(['GET'])
# # def check_list(request):
# #     checks = Check_list.objects.all()
# #     serializer = CheckListSerializer(checks, many=True)
# #     return Response(serializer.data)

# # @api_view(['GET'])
# # def check_detail(request, check_pk):
# #     check = get_object_or_404(Check_list, pk=check_pk)
# #     serializer = CheckSerializer(check)
# #     return Response(serializer.data)

# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def create_check(request):
# #     serializer = CheckSerializer(data=request.data)
# #     if serializer.is_valid(raise_exception=True):
# #         serializer.save(user=request.user)  # NOT NULL CONSTRAINT FAILD #user_id=1 
# #         return Response(serializer.data)

# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def create_list(request):
# #     serializer = StuffSerializer(data=request.data)
# #     if serializer.is_valid(raise_exception=True):
# #         serializer.save(commit=False)  # NOT NULL CONSTRAINT FAILD #user_id=1 
# #         return Response(serializer.data)

# # @api_view(['POST'])
# # def getpicture(request):
# #     serializer = PictureSetSerializer(data=request.data)
# #     if serializer.is_valid(raise_exception=True):
# #         serializer.save(commit=False)  # NOT NULL CONSTRAINT FAILD #user_id=1 
# #         return Response(serializer.data)


from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from .models import Supplies, Stuff
from .serializers import SuppliesSerializer, StuffSerializer
from .permissions import IsOwner
from accounts.models import User
from accounts.serializers import UserSerializer
from utilities.models import Date, Place
import json


class CheckViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve" or self.action == "search":
            permission_classes = [permissions.AllowAny]
        elif self.action == "new":
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsOwner]
        return [permission() for permission in permission_classes]


    # 준비물 리스트 저장
    @action(detail=True, methods=["post"])
    def new(self, request, pk):
        user = self.get_object()

        # date
        temp_date = request.data.get("date")
        if Date.objects.filter(number=temp_date).exists():
            date = Date.objects.get(number=temp_date)
        else:
            date = Date.objects.create(number=temp_date)
        request.data['date'] = date

        # place
        temp_place = request.data.get("place")
        if Place.objects.filter(name=temp_place).exists():
            place = Place.objects.get(name=temp_place)
        else:
            place = Place.objects.create(name=temp_place)
        request.data['place'] = place
        
        supplies = Supplies.objects.create(
            content = request.data.get("content"),
            date = request.data.get("date"),
            place = request.data.get("place"),
            owner = user
        )

        # stuffs
        stuffs = request.data.pop("stuffs")
        stuff_list = []
        for stuff in stuffs:
            if Stuff.objects.filter(name=stuff['name']).exists():
                temp_stuff = Stuff.objects.get(name=stuff['name'])
            else:
                temp_stuff = Stuff.objects.create(name=stuff['name'])
            stuff_list.append(temp_stuff)
        supplies.stuffs.set(stuff_list)

        serializer = SuppliesSerializer(supplies)

        return Response(serializer.data)


    # 준비물 검색
    @action(detail=True, methods=["post"])
    def search(self, request, pk):
        pass