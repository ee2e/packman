from bs4 import BeautifulSoup as bs
from pprint import pprint
import requests

html = requests.get('https://search.naver.com/search.naver?query=날씨')
# pprint(html.text)

soup = bs(html.text,'html.parser')

# data1 = soup.find('div',{'class':'detail_box'})
# # pprint(data1)
# data2 = data1.findAll('dd')
# # pprint(data2)
# fine_dust = data2[0].find('span',{'class':'num'})
# # print(fine_dust)

data1 = soup.find('ul',{'class':'list_area _pageList'})
# pprint(data1)
data2 = data1.findAll('span')
# pprint(data2[2])
data3 = data1.findAll('span',{'class':'num'})
pprint(data3)
#https://wikidocs.net/35949
#https://velog.io/@magnoliarfsit/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%9B%B9-%ED%81%AC%EB%A1%A4%EB%A7%81-2-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%82%A0%EC%94%A8-%ED%81%AC%EB%A1%A4%EB%A7%81%ED%95%98%EA%B8%B0
#https://velog.io/@seob/%EB%82%A0%EC%94%A8-API-%EC%97%86%EC%9D%B4-%EB%82%A0%EC%94%A8-%EC%A0%95%EB%B3%B4-%EC%96%BB%EA%B8%B0feat.-BeautifulSoup
