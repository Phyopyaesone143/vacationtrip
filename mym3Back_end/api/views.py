from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout 
from datetime import datetime
from api.models import *
from .serializers import TripSerializer, VacationSerializer

# Create your views here.

# @api_view(['GET'])
# def Triplist(request):
#     trips = TripModel.objects.all()
#     serializer = TripSerializer(trips, many=True)
#     return Response(serializer.data)

# Register view
@api_view(["POST"])
@permission_classes([AllowAny])
def Register(request):

    data = request.data
    
    first_name = data.get("first_name", "")
    last_name = data.get("last_name", "")
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    password_confirm = data.get("password_confirm")

    # Validation
    if not username or not email or not password:
        return Response(
            {"error": "Username, Email and Password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if password != password_confirm:
        return Response(
            {"error": "Passwords do not match"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Create user
    user = User.objects.create_user(
        # first_name=first_name,
        # last_name=last_name,
        username=username,
        email=email,
        password=password,
    )

    return Response(
        {
            "message": "Register successfully",
            "username": user.username,
            "email": user.email,
        },
        status=status.HTTP_201_CREATED
    )

# Loginview
@api_view(["POST"])
@permission_classes([AllowAny])
def LoginView(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Login the user using Django session
    login(request, user)

    return Response(
        {
            "message": "Login successfully",
            "username": user.username,
            "email": user.email,
        },
        status=status.HTTP_200_OK,
    )
        
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def LogoutView(request):
    logout(request)
    return Response({"message": "Logout successfully"}, status=status.HTTP_200_OK)



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
                    "id":vacation.id,
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

#  Booking create view   
@api_view(['POST'])
# @permission_classes(AllowAny)   # user must be logged in
def BookCreate(request):
    user = request.user

    vacation_id = request.data.get('vacation_id')
    v_days = request.data.get('v_days', 1)
    ondate_str = request.data.get('ondate')  # "YYYY-MM-DD"

    if not vacation_id:
        return Response(
            {"error": "vacation_id is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        vacation = VacationModel.objects.get(id=vacation_id)
    except VacationModel.DoesNotExist:
        return Response(
            {"error": "Vacation not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # days
    try:
        v_days = int(v_days)
        if v_days <= 0:
            raise ValueError
    except ValueError:
        return Response(
            {"error": "v_days must be a positive integer"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # date
    if ondate_str:
        try:
            ondate = datetime.strptime(ondate_str, "%Y-%m-%d").date()
        except ValueError:
            return Response(
                {"error": "ondate must be in YYYY-MM-DD format"},
                status=status.HTTP_400_BAD_REQUEST
            )
    else:
        # use default in model (tomorrow)
        ondate = None

    # total price calculated on backend
    total_price = vacation.price * v_days

    book = BookModel.objects.create(
        vacation=vacation,
        travellor=user,
        v_days=v_days,
        ondate=ondate if ondate else None,  # model default will handle if None
        total_price=total_price,
    )

    return Response(
        {
            "message": "Booking created successfully",
            "booking": {
                "id": book.id,
                "vacation": book.vacation.id,
                "vacation_place": book.vacation.place.trip_name,
                "travellor": book.travellor.username if book.travellor else None,
                "v_days": book.v_days,
                "ondate": book.ondate,
                "total_price": str(book.total_price),
            }
        },
        status=status.HTTP_201_CREATED
    )