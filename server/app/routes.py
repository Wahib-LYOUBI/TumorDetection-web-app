from flask import Blueprint, request, send_file
from PIL import Image
from .inference import predict

main_bp = Blueprint('main', __name__)

# @main_bp.route('/', methods=['GET'])
# def upload_image():
#     return """
#         <form action="" method="post" enctype="multipart/form-data">
#             <input type="file" name="mammogram" id="mammogram" accept="image/*" required/>
#             <input type="submit" />
#         </form>
#     """ 

@main_bp.route("/", methods=["POST"])
def receive_image():
    mammogram_file = request.files['mammogram']
    mammogram_image = Image.open(mammogram_file.stream).convert('L')
    prediction_path = predict(mammogram_image) 
    return send_file(prediction_path, mimetype='image/png')