from rest_framework import serializers
from .models import Supplies, Stuff
from accounts.serializers import UserSerializer

# class CheckImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CheckImage
#         fields = ['image']

# class CheckListSerializer(serializers.ModelSerializer):
#     # user = UserSerializer(required=False)
#     class Meta:
#         model = Check_list
#         fields = ['id', 'content', 'place', 'stufflist', 'user']

# class StuffSerializer(serializers.ModelSerializer):
#     user = UserSerializer(required=False)
#     class Meta:
#         model = Stuff
#         fields = '__all__'

# class CheckSerializer(serializers.ModelSerializer):
#     # images = CheckImageSerializer(many=True, read_only=True)
#     user = UserSerializer(required=False) #create에서 is_valid()에서 유무검증을 pass
#     class Meta:
#         model = Check_list
#         fields ='__all__' # ['id', 'content', 'date', 'user'] 

#         # def create(self, validated_data):
#         #     images_data = self.context['request'].FILES
#         #     checklist = Check_list.objects.create(**validated_data)
#         #     for image_data in images_data.getlist('image'):
#         #         CheckImage.objects.create(post=post, image=image_data)
#         #     return checklist

# class PictureSetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = pictureset
#         fields ='__all__'