# Image Augmentation

import tensorflow as tf
import numpy as np
import cv2
import os
from os import listdir
from os.path import isfile, join
from PIL import Image

# from tf.keras.python.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img

np.random.seed(15)

path = 'data/test'

generator = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255,
                                                            rotation_range=30,
                                                            shear_range=5.5,
                                                            # width_shift_range=0.3,
                                                            height_shift_range=0.3,
                                                            zoom_range=0.,
                                                            horizontal_flip=True,
                                                            vertical_flip=True)

# generator = generator.flow_from_directory(path,  # this is the target directory
#                                           target_size=(416, 416),  # 모든 이미지의 크기가 150x150로 조정됩니다.
#                                           batch_size=16,
#                                           class_mode='binary'
#                                           )  # binary_crossentropy 손실 함수를 사용하므로 binary 형태로 라벨을 불러와야 합니다.

i = 0

for batch in generator.flow_from_directory(path, target_size=(416,416),
    class_mode='binary', shuffle=False, batch_size=16,
    save_to_dir=path+'/augmentationn', save_prefix='socks', save_format='jpg'):

    i += 1
    if i > 20: # save 20 images
        break  # otherwise the generator would loop indefinitely

# filename_in_dir = []
#
# for root, dirs, files in os.walk('./data/socks/aug/new_socks'):
#     for fname in files:
#         full_fname = os.path.join(root, fname)
#         filename_in_dir.append(full_fname)
#
# for file_image in filename_in_dir:
#     img = tf.keras.preprocessing.image.load_img(file_image)
#     x = tf.keras.preprocessing.image.img_to_array(img)
#     x = x.reshape((1,) + x.shape)
#
#     i = 0
#
#     for batch in generator.flow(x, save_to_dir='./data/socks/aug/new_socks/aug_socks', save_prefix='socks', save_format='jpg'):
#         i += 1
#         if i > 40:
#             break
