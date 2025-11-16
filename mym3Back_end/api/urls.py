from django.urls import path
from api.views import *
urlpatterns = [
   path('trip/list/',TripList),
   path('trip/create/',TripCreate),
   path('trip/update/<int:pk>/',TripUpdate),
   path('trip/delete/<int:pk>/',TripDelete),

   path('vacation/list/', VacationList),
]