from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)  # Permite acesso de qualquer domínio

db = SQLAlchemy(app)
ma = Marshmallow(app)

from routes import *

if __name__ == '__main__':
    with app.app_context():  
      db.create_all()
    app.run(debug=True)