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
python flow --model ./cfg/yolo-new.cfg --labels ./labels.txt --trainer adam --dataset ./data/datasets/airpot/ --annotation ./data/annotations/airpot/ --train --summary ./logs --batch 1 --epoch 100 --save 50 --keep 5 --lr 1e-04 --gpu 0.4
```



> 실행 명령어

```python
python flow --model ./cfg/yolo.cfg --load ./bin/yolov2.weights --batch 5 --gpu 0.4 --imgdir ./data/datasets/
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

```

> self.offset = 16 + (found - expect)



```python
None type error(shape)
```

>  .xml 내 .jpg 이름 확인



> darkflow는 이미지를 .xml로 요구함