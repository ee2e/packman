## Darkflow를 활용하여 YOLO 모델로 이미지 디텍션 구현(윈도우 환경)



## YOLOv2 (ft.Darkflow)

- Object Detection
- tensorflow-gpu 1.5
- Python 3.6
- CUDA 9.0
- cuDNN 7.0
- Anaconda



## Process

> 학습 명령어

```python
python flow --model ./cfg/my-tiny-yolo.cfg --labels ./labels.txt --trainer adam --dataset ./data/datasets/ --annotation ./data/annotations/ --train --summary ./logs --batch 5 --epoch 100 --save 50 --keep 5 --lr 1e-04 --gpu 0.5

```



> 실행 명령어

```python
python flow --model ./cfg/my-tiny-yolo.cfg --load -1 --batch 5 --gpu 0.5 --imgdir ./my_img/
```





## Error

```python
ModuleNotFoundError: No module named 'tensorflow.contrib'
```

>  tensorflow-gpu == 2.2.0 버전에서는 사용 불가 버전 1.5로 다운그래이드



```python
UnicodeDecodeError: 'cp949' codec can't decode byte 0xed in position 132: illegal multibyte sequence
```

> 모든 .txt, .xml파일의 인코딩 형식을 ANSI



```python
ResourceExhaustedError
```

> batch size 조절 필요



```python
AssertionError: expect 64701556 bytes, found 180357512
```

> self.offset = 16 + (found - expect)



```python
AttributeError: 'NoneType' object has no attribute 'shape'
```

>  .xml 내 .jpg 이름 확인 및 이미지 경로 확인



```python
AssertionError: Over-read ./bin/yolov2-tiny.weights
```

>.weights 와 .cfg 매칭이 안되기 때문



```python
ModuleNotFoundError: No module named 'libs.resources'
```

>pyrcc5 -o libs/resources.py resources.qrc



```
sre_constants.error: bad character range s-1 at position 12
```

> .xml파일이 이름에 '-' 포함했기 때문에



> darkflow는 이미지를 .xml로 요구함



> TensorFlow를 기반으로 학습한 모델은 가중치 정보를 포함하는 파일로 변환하여 다양한 플랫폼에 적용할 수 있다.

> Darkflow 역시 TensorFlow를 기반으로하기 때문에 Darkflow를 이용해 학습한 모델을 여러 응용 프로그램에 적용하는 것은 어렵지 않다. 
> -> Darknet 대신 Darkflow를 사용한 이유



> --summary /<저장경로>
> tensorboard --logdir=./



> 모든 존재하는 TensorBoard를 Kill하려면
> pkill -f "tensorboard"



> ./flow --model cfg/yolo.cfg --load -1 --savepb



> flow_from_directory는 이미지를 불러올 때 폴더명에 맞춰 자동으로 labelling을 해주기 때문입니다.



> 이미지 크기 416x416