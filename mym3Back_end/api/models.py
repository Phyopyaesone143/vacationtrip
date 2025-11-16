from django.db import models

# Create your models here.

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