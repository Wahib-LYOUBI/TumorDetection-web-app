from flask import Blueprint, request, send_file
from io import BytesIO
from PIL import Image

routes = Blueprint('routes', __name__)

@routes.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return {'error': 'No image provided'}, 400

    image_file = request.files['image']
    
    # Optionally open and process image
    image = Image.open(image_file.stream)

    # Save image to buffer (return as JPEG)
    img_io = BytesIO()
    image.save(img_io, 'JPEG')
    img_io.seek(0)

    return send_file(
        img_io,
        mimetype='image/jpeg',
        as_attachment=False,
        download_name='prediction.jpg'
    )
