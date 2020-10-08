from django.urls import path
from . import views

app_name = 'utilities'

urlpatterns = [
    # path('', views.check_list),
    path('detect/', views.detect),
    # path('travelweather/', views.travelweather),
    # path('nowweather/', views.nowweather),
    # path('<int:check_pk>/', views.check_detail),
    # path('picture/', views.getpicture),
    path('index/', views.index),
]