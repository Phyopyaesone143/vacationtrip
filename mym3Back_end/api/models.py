from django.db import models
from datetime import date, timedelta
from django.contrib.auth.models import User
# Create your models here.
def tomorrow():
    return date.today() + timedelta(days=1)

class TripModel(models.Model):
    trip_name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images',null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.trip_name
    
class VacationModel(models.Model):
    place = models.ForeignKey(TripModel,on_delete=models.CASCADE,null=True,)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.CharField(max_length=2000)
    duration = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.place.trip_name
    
class BookModel(models.Model):
    vacation = models.ForeignKey(VacationModel,on_delete=models.CASCADE,null=True)
    travellor = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    v_days = models.IntegerField(default=1)
    ondate = models.DateField(default=tomorrow)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.travellor.username