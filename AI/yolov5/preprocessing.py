from glob import glob
from sklearn.model_selection import train_test_split
import yaml


img_list_socks = glob('dataset/socks/images/*.jpg')
img_list_ballcap = glob('dataset/ballcap/images/*.jpg')
img_list_shirt = glob('dataset/shirt/images/*.jpg')
# img_list_pants = glob('dataset/pants/images/*.jpg')
img_list_hair_dryer = glob('dataset/hair_dryer/images/*.jpg')
img_list_mask = glob('dataset/mask/images/*.jpg')
img_list_charger = glob('dataset/charger/images/*.jpg')
img_list_backpack = glob('dataset/backpack/images/*.jpg')
img_list_Tshirt = glob('dataset/T-shirt/images/*.jpg')


# print(len(img_list_socks))
# print(len(img_list_ballcap))
# print(len(img_list_shirt))
# print(len(img_list_pants))

train_set_socks, val_set_socks = train_test_split(
    img_list_socks, test_size=0.2, random_state=2000)
train_set_ballcap, val_set_ballcap = train_test_split(
    img_list_ballcap, test_size=0.2, random_state=2000)
train_set_shirt, val_set_shirt = train_test_split(
    img_list_shirt, test_size=0.2, random_state=2000)
# train_set_pants, val_set_pants = train_test_split(img_list_pants, test_size=0.2, random_state=2000)
train_set_hair_dryer, val_set_hair_dryer = train_test_split(
    img_list_hair_dryer, test_size=0.2, random_state=2000)
train_set_mask, val_set_mask = train_test_split(
    img_list_mask, test_size=0.2, random_state=2000)
train_set_charger, val_set_charger = train_test_split(
    img_list_charger, test_size=0.2, random_state=2000)
train_set_backpack, val_set_backpack = train_test_split(
    img_list_backpack, test_size=0.2, random_state=2000)
train_set_Tshirt, val_set_Tshirt = train_test_split(
    img_list_Tshirt, test_size=0.2, random_state=2000)


# print(len(train_set_socks), len(val_set_socks))
# print(len(train_set_ballcap), len(val_set_ballcap))
# print(len(train_set_shirt), len(val_set_shirt))
# print(len(train_set_pants), len(val_set_pants))

# print(val_set_ballcap[3])

# with open('./dataset/test/train.txt', 'w') as f:
#   f.write('\n'.join(train) + '\n')
# with open('./dataset/test/val.txt', 'w') as f:
#   f.write('\n'.join(val)+ '\n')

# socks
with open('./dataset/socks/train_socks.txt', 'w') as f:
    f.write('\n'.join(train_set_socks) + '\n')

with open('./dataset/socks/val_socks.txt', 'w') as f:
    f.write('\n'.join(val_set_socks) + '\n')

# ballcap
with open('./dataset/ballcap/train_ballcap.txt', 'w') as f:
    f.write('\n'.join(train_set_ballcap) + '\n')

with open('./dataset/ballcap/val_ballcap.txt', 'w') as f:
    f.write('\n'.join(val_set_ballcap) + '\n')

# shirt
with open('./dataset/shirt/train_shirt.txt', 'w') as f:
    f.write('\n'.join(train_set_shirt) + '\n')

with open('./dataset/shirt/val_shirt.txt', 'w') as f:
    f.write('\n'.join(val_set_shirt) + '\n')

# ## pants
# with open('./dataset/pants/train_pants.txt', 'w') as f:
#   f.write('\n'.join(train_set_pants) + '\n')

# with open('./dataset/pants/val_pants.txt', 'w') as f:
#   f.write('\n'.join(val_set_pants) + '\n')

# hair_dryer
with open('./dataset/hair_dryer/train_hair_dryer.txt', 'w') as f:
    f.write('\n'.join(train_set_hair_dryer) + '\n')

with open('./dataset/hair_dryer/val_hair_dryer.txt', 'w') as f:
    f.write('\n'.join(val_set_hair_dryer) + '\n')

# mask
with open('./dataset/mask/train_mask.txt', 'w') as f:
    f.write('\n'.join(train_set_mask) + '\n')

with open('./dataset/mask/val_mask.txt', 'w') as f:
    f.write('\n'.join(val_set_mask) + '\n')

# charger
with open('./dataset/charger/train_charger.txt', 'w') as f:
    f.write('\n'.join(train_set_charger) + '\n')

with open('./dataset/charger/val_charger.txt', 'w') as f:
    f.write('\n'.join(val_set_charger) + '\n')

# backpack
with open('./dataset/backpack/train_backpack.txt', 'w') as f:
    f.write('\n'.join(train_set_backpack) + '\n')

with open('./dataset/backpack/val_backpack.txt', 'w') as f:
    f.write('\n'.join(val_set_backpack) + '\n')

# T-shirt
with open('./dataset/T-shirt/train_T-shirt.txt', 'w') as f:
    f.write('\n'.join(train_set_Tshirt) + '\n')

with open('./dataset/T-shirt/val_T-shirt.txt', 'w') as f:
    f.write('\n'.join(val_set_Tshirt) + '\n')


with open('./dataset/my_data.yaml', 'r') as f:
    data = yaml.load(f)

# print(data)

# data['train'] = ['./dataset/socks/train_socks.txt', './dataset/ballcap/train_ballcap.txt']
# data['val'] = ['./dataset/ballcap/val_ballcap.txt', './dataset/ballcap/val_ballcap.txt']

# with open('./dataset/socks.yaml', 'w') as f:
#   yaml.dump(data, f)

# print(data)

# !python train.py --img 416 --batch 16 --epochs 50 --data ./dataset/data.yaml --cfg ./models/yolov5s.yaml --weights yolov5s.pt --name gun_yolov5s_results

# !python train.py --img 416 --batch 8 --epochs 100 --data ./data/socks.yaml --cfg ./models/yolov5s.yaml --weights yolov5s.pt --name socks_yolov5s_results

# # Commented out IPython magic to ensure Python compatibility.
# # %load_ext tensorboard
# # %tensorboard --logdir /content/yolov5/runs/

# import os

# val_img_path = val_img_list[8]
# # val_img_path = "/content/dataset/d.jpg"

# !python detect.py --weights /content/yolov5/runs/exp0_gun_yolov5s_results/weights/best.pt --img 416 --conf 0.5 --source "{val_img_path}"

# Image(os.path.join('/content/yolov5/inference/output', os.path.basename(val_img_path)))
