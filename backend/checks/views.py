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


# detection
 
from rest_framework import status



class CheckViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "new" or self.action == "checklist":
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
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

    @action(detail=True, methods=["get"])
    def checklist(self, request, pk):
        user = self.get_object()
        supplies = Supplies.objects.filter(owner=user)
        serializer = SuppliesSerializer(supplies, many=True)
        return Response(serializer.data)



    # localhost:8000/api/v1/checks/distinction/
    # distinct stuff
    @action(detail=True, methods=["post"])
    def distinction(self, request, pk):
        print(request.data)
        # check_data = request.data.get("check")             # 리스트로 저장
        # check_data = check_data.split()
        # # print(check_data)
        # # print(type(check_data))
        # # print(check_data[0])
        # add_data = request.data.get("addcheck")       # 리스트로 저장 
        # add_data = add_data.split()

        # haved_stuffs = Stuff.objects.all()
        # # print(haved_stuffs)
        # DB_list = []
        # for stuff in haved_stuffs:
        #     # print(stuff.name)
        #     DB_list.append(stuff.name)
        # # print(DB_list)

        # if check_data:
        #     for item in check_data:
        #         if item in DB_list:
        #             a = Stuff.objects.filter(name=item)[0]
        #             a.check = True
        #             a1.save()
        
        # if add_data:
        #     for c in add_data:
        #         a = Stuff()
        #         a.name = c
        #         a.check = True
        #         a.save()

        supplies_id = request.data.get("suppliesId")
        stuffs = request.data.get("stuffs")

        supplies = Supplies.objects.get(pk=supplies_id)

        for stuff in stuffs:
            if Stuff.objects.filter(name=stuff['name']).exists():
                temp_stuff = Stuff.objects.get(name=stuff['name'])
                temp_stuff.check = stuff['check']
                temp_stuff.save()
            else:
                temp_stuff = Stuff.objects.create(name=stuff['name'])
                supplies.stuffs.add(temp_stuff)
                temp_stuff.check = stuff['check']
                temp_stuff.save()

        serializer = SuppliesSerializer(supplies, many=True)

        return Response(serializer.data)