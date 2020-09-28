from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import requests
import json
import pandas as pd

from xml.etree.ElementTree import parse

import xmltodict

url = 'http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList'
queryParams = '?' + urlencode({ quote_plus('ServiceKey') : 'jZ3%2FFq%2BXYo%2Be7JjXmVrkIBfYzl3XyQf6cSsyL5zUxo%2FBajw58wdOx31jgntb1MGCYtW0ieiVt5IcxCoBK2%2Bj6g%3D%3D', quote_plus('pageNo') : '1', quote_plus('numOfRows') : '10', quote_plus('dataType') : 'XML', quote_plus('dataCd') : 'ASOS', quote_plus('dateCd') : 'DAY', quote_plus('startDt') : '20100101', quote_plus('endDt') : '20100601', quote_plus('stnIds') : '108' })

# request = Request(url + queryParams)
# urllib.request.get_method = lambda: 'GET'
# response_body = urlopen(request).read()
# print(response_body)

request = urllib.request.Request(url + unquote(queryParams))


response_body = urlopen(request, timeout=60).read() # get bytes data
print(type(response_body))
# print(response_body[1])
# print(response_body[2])
# print(response_body[3])
# print(response_body.json)

# data = json.loads(response_body)	# convert bytes data to json data
# print(data)

decode_data = response_body.decode('utf-8')
# decode_data = decode_data.encode('utf-8')
# data = json.loads(decode_data)
print(type(decode_data))

xml_parse = xmltodict.parse(decode_data)     # string인 xml 파싱

xml_dict = json.loads(json.dumps(xml_parse))
print(type(xml_dict))
# print(xml_dict)
print(xml_dict['response']['body']['items']['item'][0]['maxTa'])