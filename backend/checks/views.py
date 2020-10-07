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
        user = self.get_object()

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
        
        total_supplies = Supplies.objects.filter(owner=user)
        serializer = SuppliesSerializer(total_supplies, many=True)

        return Response(serializer.data)
