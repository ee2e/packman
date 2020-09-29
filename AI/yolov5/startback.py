import os
import time
# 다운받을 이미지 url
url = "https://pack-man.s3.ap-northeast-2.amazonaws.com/2020929162245.jpeg"
# time check
# start = time.time()
# curl 요청
os.system("curl " + url + " > ./inference/images/a1234a.jpg")
# 이미지 다운로드 시간 체크
# print(time.time() - start)
# 저장 된 이미지 확인
# img = Image.open("test.jpg")
