import cv2
import numpy as np

num_down = 2   #no of downsampling steps
num_bilateral = 7 #no of bilateral filtering steps

img_rgb = cv2.imread("sushant.jpg")
print(img_rgb.shape) #prints the dimension of the picture

img_rgb = cv2.resize(img_rgb, (800,800))
print(img_rgb.shape)

# in this part we are downloading the img and then applying bilateral filter,mentioned amount of times

img_color = img_rgb
for _ in range(num_down):
    img_color = cv2.pyrDown(img_color)

# repeatedly apply small bilateral filter instead of applying one large filter
for _ in range(num_bilateral):
    img_color =cv2.bilateralFilter(img_color,d=9,sigmaColor=9, sigmaSpace=7)

# in this part we unsample ,covert the image to graysacle , apply median blur& then thresholding

# upsample image to original size
for _ in range(num_down):
    img_color = cv2.pyrUp(img_color)

img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)
img_blur = cv2.medianBlur(img_gray, 7)

img_edge = cv2.adaptiveThreshold(img_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, blockSize=9,C=2)

# in this part we perform bitwise AND ,& then display the resultant image

# convert back to color, bit-AND with color image
img_edge = cv2.cvtColor(img_edge, cv2.COLOR_GRAY2RGB)
img_cartoon = cv2.bitwise_and(img_color, img_edge)


#cv2.imshow('cartoon_image', img_cartoon)
stack = np.hstack([img_rgb, img_cartoon])
cv2.imwrite('sushant_img.jpg',stack)
cv2.imshow('stacked images', stack)
cv2.waitKey(0)