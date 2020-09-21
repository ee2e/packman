# Object Detection Python File

import cv2
from darkflow.net.build import TFNet
import matplotlib.pyplot as plt
import numpy as np

options = {
    'model' : './cfg/tiny-yolo-p.cfg',
    'load' : -1,
    'gpu' : 0.5,
    'threshold' : 0.5
    # 'batch' : 5
}

tfnet = TFNet(options)

path = './my_img/test/'
img_name = 'armas (4).jpg.rf.ab917ea1cc3eee37d9ce1fac8970b620.jpg'

img = cv2.imread(path + img_name, cv2.IMREAD_COLOR)
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

results = tfnet.return_predict(img)
print(len(results))

if len(results) != 0:
    colors = [tuple(255 * np.random.rand(3)) for _ in range(20)]

    temp_label = results[0]['label']
    temp_color = colors[0]

    for color, result in zip(colors, results):
        if temp_label == result['label']:
            color = temp_color
        else:
            temp_label = result['label']
            temp_color = color

        t1 = (result['topleft']['x'], result['topleft']['y'])
        br = (result['bottomright']['x'], result['bottomright']['y'])
        label = result['label']
        img = cv2.rectangle(img, t1, br, color, 2)

        img = cv2.putText(img, label + str(float('%.2f' % result['confidence'])), t1, cv2.FONT_HERSHEY_SIMPLEX, 1,
                          color, 2)

    plt.imshow(img)
    plt.show()


