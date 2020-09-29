# Image Pixel Trans

import cv2
import glob
import os

class_name = "hair_dryer"
path = glob.glob("./dataset/" + class_name + "/*.jpg")

save_path = "./dataset/" + class_name + "/images/"

if not os.path.isdir(save_path):
    os.mkdir(save_path)

for img in path:
    img_name = img.split("\\")[1]
    img = cv2.imread(img)
    img = cv2.resize(img, (416, 416))
    cv2.imwrite(save_path + img_name, img)
