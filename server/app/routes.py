from flask import Blueprint, request, send_file, jsonify
from io import BytesIO
from PIL import Image
import os
import torch
import torchvision.transforms as transforms

# Charger ton modèle
model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'best_model.pth')
model = torch.load(model_path, map_location=torch.device('cpu'))

model.eval()  # Mode évaluation pour la prédiction

# Définir la transformation de l'image (prétraitement adapté au modèle)
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Taille typique; ajuste selon ton modèle
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],  # ImageNet standards
                         std=[0.229, 0.224, 0.225])
])

routes = Blueprint('routes', __name__)

@routes.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    image = Image.open(image_file.stream).convert('RGB')  # Toujours convertir en RGB

    # Appliquer la transformation
    input_tensor = transform(image).unsqueeze(0)  # Ajouter une dimension batch

    # Faire la prédiction
    with torch.no_grad():
        output = model(input_tensor)
        prediction = torch.argmax(output, dim=1).item()

    # Optionnel : retourner directement la prédiction en JSON
    return jsonify({'prediction': prediction})

