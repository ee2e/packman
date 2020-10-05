from django.db import models
from django.conf import settings

class Stuff(models.Model):
    name = models.CharField(max_length=20)
    check = models.BooleanField(default=False)

class Supplies(models.Model):
    content = models.CharField(max_length=100)
    stuffs = models.ManyToManyField(Stuff, related_name="supply_stuff", blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.ForeignKey("utilities.Date", related_name="supply_date", on_delete=models.PROTECT)
    place = models.ForeignKey("utilities.Place", related_name="supply_place", on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now= True)