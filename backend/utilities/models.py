from django.db import models

from checks.models import Supplies, Stuff

class Date(models.Model):
    number = models.IntegerField()
    weather = models.CharField(max_length=20, blank=True)

class Place(models.Model):
    name = models.CharField(max_length=30)

class Recommend(models.Model):
    place = models.ForeignKey(Place, related_name='recommend_place', on_delete=models.PROTECT)
    date = models.ForeignKey(Date, related_name='recommend_date', on_delete=models.PROTECT)
    stuffs = models.ManyToManyField(Stuff, related_name='recommend_stuff', blank=True)

def upload_path(instance, filename):
    return '/'.join['covers', str(instance.checklist), filename]

class CheckImage(models.Model):
    checklist = models.ForeignKey(Supplies, on_delete=models.CASCADE)
    # image = models.ImageField(blank=True, null=True, upload_to=upload_path)

class Pictureset(models.Model):
    urlpicture = models.TextField()