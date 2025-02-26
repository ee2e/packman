import xml.etree.ElementTree as ET

from os import listdir
import cv2
import numpy as np

import imgaug as ia
from imgaug import augmenters as iaa
from pascal_voc_writer import Writer


def read_annotation(xml_file: str):
    tree = ET.parse(xml_file)
    root = tree.getroot()

    bounding_box_list = []

    file_name = root.find('filename').text
    for obj in root.iter('object'):

        object_label = obj.find("name").text
        for box in obj.findall("bndbox"):
            x_min = int(box.find("xmin").text)
            y_min = int(box.find("ymin").text)
            x_max = int(box.find("xmax").text)
            y_max = int(box.find("ymax").text)

        bounding_box = [object_label, x_min, y_min, x_max, y_max]
        bounding_box_list.append(bounding_box)

    return bounding_box_list, file_name

def read_train_dataset(dir):
    images = []
    annotations = []

    for file in listdir(dir):
        if 'jpg' in file.lower() or 'png' in file.lower():
            images.append(cv2.imread(dir + file, 1))
            annotation_file = file.replace(file.split('.')[-1], 'xml')
            bounding_box_list, file_name = read_annotation(dir + annotation_file)
            annotations.append((bounding_box_list, annotation_file, file_name))

    images = np.array(images)

    return images, annotations

ia.seed(1)

dir = './data/socks/'
images, annotations = read_train_dataset(dir)
size = len(images)

for idx in range(size * 5):
    image = images[idx % size]
    boxes = annotations[idx % size][0]

    ia_bounding_boxes = []
    for box in boxes:
        ia_bounding_boxes.append(ia.BoundingBox(x1=box[1], y1=box[2], x2=box[3], y2=box[4]))

    bbs = ia.BoundingBoxesOnImage(ia_bounding_boxes, shape=image.shape)

    sometimes = lambda aug: iaa.Sometimes(0.5, aug)

    # seq = iaa.Sequential([
    #     iaa.Multiply((1.2, 1.5)),
    #     iaa.Affine(
    #         translate_px={"x": 40, "y": 60},
    #         scale=(0.5, 0.7)
    #     )
    # ])

    seq = iaa.Sequential([
        iaa.Fliplr(0.5),    # horizontal flips
        iaa.Flipud(0.2),  # vertically flip 20% of all images
        iaa.Multiply((1.2, 1.5)),  # change brightness, doesn't affect BBs
        iaa.Affine(
            scale={"x": (0.8, 1.0), "y": (0.8, 1.0)},
            translate_percent={"x": (-0.2, 0.2), "y": (-0.2, 0.2)},
        ),  # translate by 40/60px on x/y axis, and scale to 50-70%, affects BBs
        iaa.AdditiveGaussianNoise(scale=0.1 * 255), # 가우시안 필터
        iaa.CoarseDropout(0.02, size_percent=0.20, per_channel=0.5), # dot
        iaa.ClipCBAsToImagePlanes(),
        # iaa.Sharpen(alpha=0.5) # 흐린 점
        ], random_order=True)

    # seq = iaa.Sequential([
    #     iaa.Fliplr(0.5),  # horizontal flips
    #     iaa.Crop(percent=(0, 0.1)),  # random crops
    #     # Small gaussian blur with random sigma between 0 and 0.5.
    #     # But we only blur about 50% of all images.
    #     iaa.Sometimes(
    #         0.5,
    #         iaa.GaussianBlur(sigma=(0, 0.5))
    #     ),
    #     # Strengthen or weaken the contrast in each image.
    #     iaa.LinearContrast((0.75, 1.5)),
    #     # Add gaussian noise.
    #     # For 50% of all images, we sample the noise once per pixel.
    #     # For the other 50% of all images, we sample the noise per pixel AND
    #     # channel. This can change the color (not only brightness) of the
    #     # pixels.
    #     iaa.AdditiveGaussianNoise(loc=0, scale=(0.0, 0.05 * 255), per_channel=0.5),
    #     # Make some images brighter and some darker.
    #     # In 20% of all cases, we sample the multiplier once per channel,
    #     # which can end up changing the color of the images.
    #     iaa.Multiply((0.8, 1.2), per_channel=0.2),
    #     # Apply affine transformations to each image.
    #     # Scale/zoom them, translate/move them, rotate them and shear them.
    #     iaa.Affine(
    #         scale={"x": (0.8, 1.0), "y": (0.8, 1.0)},
    #         translate_percent={"x": (-0.2, 0.2), "y": (-0.2, 0.2)},
    #         # rotate=(-25, 25),
    #         shear=(-8, 8)
    #     ),
    #     iaa.ClipCBAsToImagePlanes()
    # ], random_order=True)  # apply augmenters in random order


    # seq = iaa.Sequential([
    #     # apply the following augmenters to most images
    #     iaa.Fliplr(0.5),  # horizontally flip 50% of all images
    #     iaa.Flipud(0.2),  # vertically flip 20% of all images
    #     # crop images by -5% to 10% of their height/width
    #     sometimes(iaa.CropAndPad(
    #         percent=(-0.05, 0.1),
    #         pad_mode=ia.ALL,
    #         pad_cval=(0, 255)
    #     )),
    #     sometimes(iaa.Affine(
    #         scale={"x": (0.8, 1.2), "y": (0.8, 1.2)},  # scale images to 80-120% of their size, individually per axis
    #         translate_percent={"x": (-0.2, 0.2), "y": (-0.2, 0.2)},  # translate by -20 to +20 percent (per axis)
    #         rotate=(-45, 45),  # rotate by -45 to +45 degrees
    #         shear=(-16, 16),  # shear by -16 to +16 degrees
    #         order=[0, 1],  # use nearest neighbour or bilinear interpolation (fast)
    #         cval=(0, 255),  # if mode is constant, use a cval between 0 and 255
    #         mode=ia.ALL  # use any of scikit-image's warping modes (see 2nd image from the top for examples)
    #     )),
    #     iaa.ClipCBAsToImagePlanes(),
    #     # execute 0 to 5 of the following (less important) augmenters per image
    #     # don't execute all of them, as that would often be way too strong
    #     iaa.SomeOf((0, 5),
    #                [
    #                    sometimes(iaa.Superpixels(p_replace=(0, 1.0), n_segments=(20, 200))),
    #                    # convert images into their superpixel representation
    #                    iaa.OneOf([
    #                        iaa.GaussianBlur((0, 3.0)),  # blur images with a sigma between 0 and 3.0
    #                        iaa.AverageBlur(k=(2, 7)),  # blur image using local means with kernel sizes between 2 and 7
    #                        iaa.MedianBlur(k=(3, 11)),
    #                        # blur image using local medians with kernel sizes between 2 and 7
    #                    ]),
    #                    iaa.Sharpen(alpha=(0, 1.0), lightness=(0.75, 1.5)),  # sharpen images
    #                    iaa.Emboss(alpha=(0, 1.0), strength=(0, 2.0)),  # emboss images
    #                    # search either for all edges or for directed edges,
    #                    # blend the result with the original image using a blobby mask
    #                    iaa.SimplexNoiseAlpha(iaa.OneOf([
    #                        iaa.EdgeDetect(alpha=(0.5, 1.0)),
    #                        iaa.DirectedEdgeDetect(alpha=(0.5, 1.0), direction=(0.0, 1.0)),
    #                    ])),
    #                    iaa.AdditiveGaussianNoise(loc=0, scale=(0.0, 0.05 * 255), per_channel=0.5),
    #                    # add gaussian noise to images
    #                    iaa.OneOf([
    #                        iaa.Dropout((0.01, 0.1), per_channel=0.5),  # randomly remove up to 10% of the pixels
    #                        iaa.CoarseDropout((0.03, 0.15), size_percent=(0.02, 0.05), per_channel=0.2),
    #                    ]),
    #                    iaa.Invert(0.05, per_channel=True),  # invert color channels
    #                    iaa.Add((-10, 10), per_channel=0.5),
    #                    # change brightness of images (by -10 to 10 of original value)
    #                    iaa.AddToHueAndSaturation((-20, 20)),  # change hue and saturation
    #                    # either change the brightness of the whole image (sometimes
    #                    # per channel) or change the brightness of subareas
    #                    iaa.OneOf([
    #                        iaa.Multiply((0.5, 1.5), per_channel=0.5),
    #                        iaa.FrequencyNoiseAlpha(
    #                            exponent=(-4, 0),
    #                            first=iaa.Multiply((0.5, 1.5), per_channel=True),
    #                            second=iaa.ContrastNormalization((0.5, 2.0))
    #                        )
    #                    ]),
    #                    iaa.ContrastNormalization((0.5, 2.0), per_channel=0.5),  # improve or worsen the contrast
    #                    iaa.Grayscale(alpha=(0.0, 1.0)),
    #                    sometimes(iaa.ElasticTransformation(alpha=(0.5, 3.5), sigma=0.25)),
    #                    # move pixels locally around (with random strengths)
    #                    sometimes(iaa.PiecewiseAffine(scale=(0.01, 0.05))),  # sometimes move parts of the image around
    #                    sometimes(iaa.PerspectiveTransform(scale=(0.01, 0.1)))
    #                ],
    #                random_order=True
    #                )
    # ],
    #     random_order=True
    # )

    seq_det = seq.to_deterministic()

    image_aug = seq_det.augment_images([image])[0]
    bbs_aug = seq_det.augment_bounding_boxes([bbs])[0]

    # new_image_file = dir + 'new_' + str(idx+1) + '_' + annotations[idx % size][2]
    # cv2.imwrite(new_image_file, image_aug)
    #
    # h, w = np.shape(image_aug)[0:2]
    # voc_writer = Writer(new_image_file, w, h)
    #
    # for i in range(len(bbs_aug.bounding_boxes)):
    #     bb_box = bbs_aug.bounding_boxes[i]
    #     voc_writer.addObject(boxes[i][0], int(bb_box.x1), int(bb_box.y1), int(bb_box.x2), int(bb_box.y2))
    #
    # voc_writer.save(dir + 'new_' + str(idx+1) + '_' + annotations[idx % size][1])

    for i in range(len(bbs.bounding_boxes)):
        before = bbs.bounding_boxes[i]
        after = bbs_aug.bounding_boxes[i]
        print("BB %d: (%.4f, %.4f, %.4f, %.4f) -> (%.4f, %.4f, %.4f, %.4f)" % (
            i,
            before.x1, before.y1, before.x2, before.y2,
            after.x1, after.y1, after.x2, after.y2)
              )

    image_before = bbs.draw_on_image(image, thickness=10)
    image_after = bbs_aug.draw_on_image(image_aug, thickness=10, color=[0, 0, 255])

    cv2.imshow('image_before', cv2.resize(image_before, (500, 500)))
    cv2.imshow('image_after', cv2.resize(image_after, (500, 500)))

    cv2.waitKey(0)