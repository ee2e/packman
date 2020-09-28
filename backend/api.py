import urllib.parse
import urllib.request

url="http://www.naver.com"
req=urllib.request.Request(url)
print(req)
res=urllib.request.urlopen(req)
print(res)