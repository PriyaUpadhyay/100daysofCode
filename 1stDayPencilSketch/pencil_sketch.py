import cv2
image = cv2.imread("ganesha.jpg")
grayimage = cv2.cvtColor((image),cv2.COLOR_BGR2GRAY)
grayinv = 255 - grayimage
gaussianimg = cv2.GaussianBlur(255-grayinv,(21,21),0)
finalimg = cv2.divide(grayimage,gaussianimg,scale=256.0)
cv2.imwrite("sketch_ganesha.jpg", finalimg)

cv2.imshow("original image",image)
cv2.imshow('pencil',finalimg)

cv2.waitKey(0)
cv2.destroyAllWindows()