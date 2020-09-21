from rest_framework import serializers
from .models import Check_list
from accounts.serializers import UserSerializer
# image 
class CheckListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Check_list
        fields = ['id', 'content', 'place', 'stufflist']

class CheckSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False) #create에서 is_valid()에서 유무검증을 pass
    class Meta:
        model = Check_list
        fields = ['id', 'content', 'date', 'user'] #'__all__' #