from flask import request, jsonify
from app import app, db
from models import Marca, Modelo, Carro, marca_schema, marcas_schema, modelo_schema, modelos_schema, carro_schema, carros_schema

## ROTAS PARA CRUD DE CARROS, MODELOS, MARCAS


## CRUD MARCAS, ENDPOINT /brands /brands:id
@app.route('/brands', methods=['POST'])
def create_brand():
  
    nome_marca = request.json['nome_marca']

    existing_brand = Marca.query.filter_by(nome_marca=nome_marca).first()
    if existing_brand:
        return jsonify({'message': 'Marca já existe'}), 400
    
    nova_marca = Marca(nome_marca=nome_marca)
    db.session.add(nova_marca)
    db.session.commit()

    return marca_schema.jsonify(nova_marca), 201

@app.route('/brands', methods=['GET'])
def get_brands():
    todas_marcas = Marca.query.all()
    return marcas_schema.jsonify(todas_marcas)

@app.route('/brands/<int:id>', methods=['GET'])
def get_brand(id):
    marca = Marca.query.get(id)
    if not marca:
        return jsonify({'message': 'Marca não encontrada'}), 404
    return marca_schema.jsonify(marca)

@app.route('/brands/<int:id>', methods=['PUT'])
def update_brand(id):
    marca = Marca.query.get(id)
    if not marca:
        return jsonify({'message': 'Marca não encontrada'}), 404
    
    nome_marca = request.json.get('nome_marca', marca.nome_marca)

    if nome_marca != marca.nome_marca:
        existing_brand = Marca.query.filter_by(nome_marca=nome_marca).first()
        if existing_brand:
            return jsonify({'message': 'Nome de marca já existe'}), 400
        
    marca.nome_marca = nome_marca
    db.session.commit()

    return marca_schema.jsonify(marca)

@app.route('/brands/<int:id>', methods={'DELETE'})
def delete_brand(id):
    marca = Marca.query.get(id)
    if not marca:
        return jsonify({'message': 'Marca não encontrada'}), 404
    
    db.session.delete(marca)
    db.session.commit()

    return jsonify({'message': 'Marca excluída'}), 200