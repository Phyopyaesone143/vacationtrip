from rest_framework import serializers
from .models import *

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripModel
        fields = '__all__'  # or list fields: ['id', 'trip_name', 'price', 'image', 'description']

class VacationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VacationModel
        fields = '__all__'
