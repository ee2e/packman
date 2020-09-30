### 기본 세팅

```python
!pip install -r requirements.txt
```

```python
conda install pytorch torchvision cudatoolkit=10.2 -c pytorch
```

```
pip3 install numpy matplotlib sklearn
```

```
pip install opencv-python
```

pytorch : 1.6.0

torchvision : 0.7.0

opencv : 4.1.2 >=



detect.py  -> import module error (다른 폴더 .py import) : 폴더명 앞에 . 붙여줌



> colab 90분 세션 만료 방지	

1. F12

2. console 창에 아래 코드 입력 후 실행

   ```javascript
   function ClickConnect(){
       console.log("코랩 연결 끊김 방지"); 
       document.querySelector("colab-toolbar-button#connect").click() 
   }
   setInterval(ClickConnect, 60 * 1000)
   ```

 

> 학습

1. 데이터 수집 및 라벨링
2. .yaml 생성



> colab, google drive 연동

```python
from google.colab import auth
auth.authenticate_user()

from google.colab import drive
drive.mount('/content/gdrive')
```



### 명령어

> train 명령어
>
> ```python
> python train.py --img 416 --batch 16 --epochs 50 --data ./dataset/my_data.yaml --cfg ./models/yolov5s.yaml --weights yolov5s.pt
> ```



> detect 명령어
>
> ```python
> python detect.py --source ./inference/images/ --weights ./weights/best.pt --conf 0.2
> ```



### weights

|  no   | class                                                        | data size(i,l) | batch | epochs | cfg     | weights    | time  |
| :---: | ------------------------------------------------------------ | :------------: | :---: | :----: | ------- | ---------- | :---- |
| exp41 | backpack(2028, 1906)                                         |                |  16   |   50   | yolov5s | yolov5s.pt | 0.5h  |
| exp42 | backpack(1000, 936)                                          |                |  16   |   50   | yolov5s | yolov5s.pt | 0.26h |
| exp44 | socks(112, 112), ballcap(423, 423), shrit(343, 343), pants(347, 347), mask(347, 348), charger(289, 289), backpack(1000, 936) |                |  16   |   50   | yolov5s | yolov5s.pt | 0.71h |
| exp45 | socks(112, 112), ballcap(423, 423), shrit(343, 343), pants(347, 347), mask(347, 348), charger(289, 289), backpack(1000, 936) |                |  16   |  100   | yolov5s | yolov5s.pt | 1.4h  |
| exp46 | socks(112, 112), ballcap(423, 423), shrit(343, 343), pants(347, 347), mask(347, 348), charger(289, 289), backpack(1000, 936) |                |  16   |  200   | yolov5s | yolov5s.pt | 2.8h  |
| exp47 | socks(112, 112), ballcap(423, 423), shrit(343, 343), pants(347, 347), mask(347, 348), charger(289, 289), backpack(1000, 936) |                |   8   |   50   | yolov5s | yolov5s.pt | 0.8h  |
| exp48 | shrit(1584, 1578), backpack(1000, 936)                       |                |  16   |   50   | yolov5s | yolov5s.pt | 0.6h  |
| exp50 | backpack(2028, 1906), T-shirt(,2071, 1658)                   |                |  16   |   50   | yolov5s | yolov5s.pt | 0.6h  |
| exp51 | hair_dryer(2014, 1841), backpack(2028, 1906), T-shirt(,2071, 1658) |                |  16   |  100   | yolov5s | yolov5s.pt | 3h    |
| exp52 | socks(2150, 1534), shirt(1584, 1578), hair_dryer(2014, 1841), mask(1982, 1829), backpack(2028, 1906), T-shirt(,2071, 1658) |                |  16   |   50   | yolov5s | yolov5s.pt | 3h    |
| exp53 | socks(2150, 1534), ballcap(2018, 1830), shirt(1584, 1578), hair_dryer(2014, 1841), mask(1982, 1829), charger(2128, 1294), backpack(2028, 1906), T-shirt(,2071, 1658) |                |  16   |  300   | yolov5s | yolov5s.pt |       |

