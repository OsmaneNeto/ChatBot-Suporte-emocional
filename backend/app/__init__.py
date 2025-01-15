from flask import Flask
from flask_cors import CORS
from .routes import main_routes

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object('app.config.Config')
    app.register_blueprint(main_routes)
    return app