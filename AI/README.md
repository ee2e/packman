## Darkflow를 활용하여 YOLO 모델로 이미지 디텍션 구현(윈도우 환경)



## YOLOv2 (ft.Darkflow)

- Object Detection
- tensorflow-gpu 1.5
- Python 3.6
- CUDA 9.0
- cuDNN 7.0
- Anaconda



## Process







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





