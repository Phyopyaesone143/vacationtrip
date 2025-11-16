from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from api.models import *
from .serializers import TripSerializer, VacationSerializer

# Create your views here.

# @api_view(['GET'])
# def Triplist(request):
#     trips = TripModel.objects.all()
#     serializer = TripSerializer(trips, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
# @permission_classes(AllowAny)
def TripList(request):
    trips = TripModel.objects.all().order_by('-created_at')
    try:
        return Response({
            "trips":[
                {
                    "trip_name":trip.trip_name,
                    "image":trip.image.url,
                    "created_at":trip.created_at
                }
                for trip in trips
            ],
            "success":True,
            "message":"Trip retrieved successfully"
        },status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "trips":[],
            "success":False,
            "message":f"Trip retrieved failed {str(e)}"
        },status=status.HTTP_200_OK)



@api_view(['POST'])
def TripCreate(request):
    trip_name = request.data.get('trip_name')
    image = request.data.get('image')

    if not trip_name or not image:
        return Response({
            "success":False,
            "message":"All fields are required"
        },status=status.HTTP_400_BAD_REQUEST)
    
    trip = TripModel.objects.create(
        trip_name = trip_name,
        image = image
    )
    trip.save()
    return Response({
        "trip":{
            "trip_name":trip.trip_name,
            "image":trip.image
        },
        "success":True,
        "message":"trip create successfully"
    },status=status.HTTP_200_OK)


@api_view(['PUT'])
def TripUpdate(request,pk):
    trip = TripModel.objects.get(id=pk)
    trip_name = request.data.get('trip_name')
    image = request.data.get('image')
    trip.trip_name = trip_name
    trip.image = image
    trip.save()
    return Response({
        "trip":{
            "trip_name":trip.trip_name,
            "image":trip.image
        },
        "success":True,
        "message":"Trip updated successfully"
    },status=status.HTTP_200_OK)


@api_view(['DELETE'])
def TripDelete(request,pk):
    trip = TripModel.objects.get(id=pk)
    trip.delete()
    return Response({
        "success":True,
        "message":"Trip delete successfully"
    },status=status.HTTP_200_OK)


# def VacationList(request):
#     vacations = VacationModel.objects.all()
#     serializer = VacationSerializer(vacations, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
# @permission_classes(AllowAny)
def VacationList(request):
    vacations = VacationModel.objects.all().order_by('-created_at')
    try:
        return Response({
            "vacations":[
                {
                    "place":vacation.place.trip_name,
                    "image":vacation.place.image.url,
                    "price":vacation.price,
                    "description": vacation.description,
                    "duration": vacation.duration,
                    "created_at":vacation.created_at
                }
                for vacation in vacations
            ],
            "success":True,
            "message":"Vacation retrieved successfully"
        },status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "vacations":[],
            "success":False,
            "message":f"Vacation retrieved failed {str(e)}"
        },status=status.HTTP_200_OK)