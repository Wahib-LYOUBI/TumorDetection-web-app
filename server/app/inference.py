from monai.networks.nets import UNet
import torch
import numpy as np
import matplotlib.pyplot as plt
import os
import cv2

model_path = 'app/model.pth'

model = UNet(
        spatial_dims=2,
        in_channels=1,
        out_channels=1,
        channels=(32, 64, 128, 256, 512),
        strides=(2, 2, 2, 2),
        dropout=0.1
    )

model.load_state_dict(torch.load(model_path, map_location='cpu'))
model.eval()

def save_image(prediction):
    pred_bytes = prediction.tobytes()
    pred_hash = hash(pred_bytes) % 2**64
    file_path = f'history/{pred_hash}.png'
    if not os.path.exists('app/history'):
        os.makedirs('app/history')
    plt.imsave('app/' + file_path, prediction)

    return file_path

def overlay_prediction(image, prediction, alpha=0.4):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
    overlay = image_rgb.copy()
    red_mask = np.zeros_like(image_rgb)
    red_mask[..., 0] = 255

    alpha = 0.4
    mask = prediction.astype(bool)
    overlay[mask] = cv2.addWeighted(image_rgb[mask], 1 - alpha, red_mask[mask], alpha, 0)
    
    return overlay

def preprocess_image(image):
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    image = clahe.apply(image)
    return image

def sliding_window(image, window_size, stride):
    H, W = image.shape
    for y in range(0, H - window_size + 1, stride):
        for x in range(0, W - window_size + 1, stride):
            patch = image[y:y+window_size, x:x+window_size]
            yield x, y, patch

def predict(image, window_size = 1024, stride = 512, confidence=0.7):
    image = np.array(image)
    image = preprocess_image(image)

    pred_map = np.zeros(image.shape)
    count_map = np.zeros(image.shape)

    with torch.no_grad():
        for x, y, patch in sliding_window(image, window_size, stride):
            patch_tensor = torch.tensor(patch, dtype=torch.float32).unsqueeze(0).unsqueeze(0)
            pred = torch.sigmoid(model(patch_tensor))
            pred_np = pred.squeeze().cpu().numpy()
            pred_map[y:y+window_size, x:x+window_size] += pred_np
            count_map[y:y+window_size, x:x+window_size] += 1
    
    count_map[count_map == 0] = 1
    pred_map = pred_map / count_map
    pred_bin = (pred_map > confidence).astype(np.float32)

    overlay = overlay_prediction(image, pred_bin)
    file_path = save_image(overlay)
    return file_path 

