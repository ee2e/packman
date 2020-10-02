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
from rest_framework import permissions
from .models import Supplies, Stuff
from .serializers import SuppliesSerializer, StuffSerializer
from .permissions import IsOwner
from accounts.models import User
from accounts.serializers import UserSerializer
import json


class CheckViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
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
        stuffs = request.data.get("stuffs")
        stuff_list = []
        for stuff in stuffs:
            if Stuff.objects.filter(name=stuff['name']).exists():
                temp_stuff = Stuff.objects.get(name=stuff['name'])
            else:
                temp_stuff = Stuff.objects.create(name=stuff['name'])
            stuff_list.append(temp_stuff)

        request.data['stuffs'] = stuff_list
        serializer = SuppliesSerializer(data=request.data)
        print(serializer.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(owner=user)
            return Response(serializer.data)
