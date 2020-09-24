from django.db import models
from django.conf import settings

# Create your models here.
class Check_list(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.IntegerField()
    content = models.TextField()
    place = models.CharField(max_length=30)
    stufflist = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now= True)
    

class Stuff(models.Model):
    check_id = models.ForeignKey(Check_list, on_delete=models.CASCADE)
    stuffname = models.CharField(max_length=10)

class recommand(models.Model):
    place = models.CharField(max_length=30)
    plusstuff = models.CharField(max_length=30)

def upload_path(instance, filename):
    return '/'.join['covers', str(instance.checklist), filename]

class CheckImage(models.Model):
    checklist = models.ForeignKey(Check_list, on_delete=models.CASCADE)
    # image = models.ImageField(blank=True, null=True, upload_to=upload_path)