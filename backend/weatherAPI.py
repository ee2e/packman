from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import requests
import json
import pandas as pd

url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList'
queryParams = '?' + urlencode({ quote_plus('ServiceKey') : 'jZ3%2FFq%2BXYo%2Be7JjXmVrkIBfYzl3XyQf6cSsyL5zUxo%2FBajw58wdOx31jgntb1MGCYtW0ieiVt5IcxCoBK2%2Bj6g%3D%3D', quote_plus('ServiceKey') : '-', quote_plus('pageNo') : '1', quote_plus('numOfRows') : '10', quote_plus('dataType') : 'XML', quote_plus('dataCd') : 'ASOS', quote_plus('dateCd') : 'DAY', quote_plus('startDt') : '20100101', quote_plus('endDt') : '20100601', quote_plus('stnIds') : '108' })

# request = Request(url + queryParams)
# urllib.request.get_method = lambda: 'GET'
# response_body = urlopen(request).read()
# print(response_body)

request = urllib.request.Request(url + unquote(queryParams))
response_body = urlopen(request, timeout=60).read() # get bytes data
print(response_body)
# data = json.loads(response_body)	# convert bytes data to json data
# print(data)
decode_data = response_body.decode('utf-8')
print(decode_data)