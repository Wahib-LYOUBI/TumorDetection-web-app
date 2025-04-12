from flask import Blueprint, jsonify

main_bp = Blueprint('main', __name__)

@main_bp.route("/ping", methods=["GET"])
def ping():
    return jsonify(message="Pong! Flask is running.")
