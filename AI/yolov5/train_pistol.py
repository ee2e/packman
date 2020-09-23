
from glob import glob

img_list = glob('./dataset/export/images/*.jpg')

print(len(img_list))

from sklearn.model_selection import train_test_split

train_img_list, val_img_list = train_test_split(img_list, test_size=0.2, random_state=2000)

print(len(train_img_list), len(val_img_list))

with open('./dataset/train.txt', 'w') as f:
  f.write('\n'.join(train_img_list) + '\n')

with open('./dataset/val.txt', 'w') as f:
  f.write('\n'.join(val_img_list) + '\n')

import yaml

with open('./dataset/data.yaml', 'r') as f:
  data = yaml.load(f)

print(data)

data['train'] = './dataset/train.txt'
data['val'] = './dataset/val.txt'

with open('./dataset/data.yaml', 'w') as f:
  yaml.dump(data, f)

print(data)

# Commented out IPython magic to ensure Python compatibility.
# %cd /content/yolov5/

# !python train.py --img 416 --batch 16 --epochs 50 --data /content/dataset/data.yaml --cfg ./models/yolov5s.yaml --weights yolov5s.pt --name gun_yolov5s_results


