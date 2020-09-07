import numpy as np

def mapp(h):
    # initialzie a list of coordinates that will be ordered
	# such that the first entry in the list is the top-left,
	# the second entry is the top-right, the third is the
	# bottom-right, and the fourth is the bottom-left
    h = h.reshape((4,2))
    rect = np.zeros((4,2),dtype = np.float32)

    add = h.sum(1)
    # the top-left point will have the smallest sum, whereas the bottom-right point will have the largest sum
    rect[0] = h[np.argmin(add)]
    rect[2] = h[np.argmax(add)]
    
    # now, compute the difference between the points, the top-right point will have the smallest difference,
	# whereas the bottom-left will have the largest difference

    diff = np.diff(h,axis = 1)
    rect[1] = h[np.argmin(diff)]
    rect[3] = h[np.argmax(diff)]

    return rect
