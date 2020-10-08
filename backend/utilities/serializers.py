from rest_framework import serializers
from .models import Date, Place

class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Date
        fields = '__all__'

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'