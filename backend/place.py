from django.contrib.gis.utils import GeoIP
from django.template import  RequestContext
from django.shortcuts import render_to_response


def home(request):
  g = GeoIP()
  client_ip = request.META['REMOTE_ADDR']
  lat,long = g.lat_lon(client_ip)
  return render_to_response('home_page_tmp.html',locals())