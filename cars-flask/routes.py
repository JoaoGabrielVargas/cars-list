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

## CRUD para tabela Modelos

@app.route('/models', methods=['POST'])
def create_model():
    dados = request.json
    marca_id = dados['marca_id']

    marca = Marca.query.get(marca_id)
    if not marca:
        return jsonify({'message': 'Marca não encontrada'}), 400
    
    novo_modelo = Modelo(
        nome=dados['nome'],
        valor_fipe=dados['valor_fipe'],
        marca_id=marca_id
    )

    db.session.add(novo_modelo)
    db.session.commit()

    return modelo_schema.jsonify(novo_modelo), 201


@app.route('/models', methods=['GET'])
def get_models():
    todos_modelos = Modelo.query.all()
    return modelo_schema.jsonify(todos_modelos)


app.route('/models/<int:id>', methods=['GET'])
def get_model(id):
    modelo = Modelo.query.get(id)
    if not modelo:
        return jsonify({'message': 'Modelo não encontrado'}), 404
    return modelo_schema.jsonify(modelo)


app.route('/models/<int:id>', methods=['PUT'])
def update_model(id):
    modelo = Modelo.query.get(id)
    if not modelo:
        return jsonify({'message': 'Modelo não encontrado'}), 404
    
    nome = request.json.get('nome')
    if nome != modelo.nome:
        existing_model = Marca.query.filter_by(nome=nome).first()
        if existing_model:
            return jsonify({'message': 'Nome de modelo já existe'}), 400
        
    modelo.nome = nome
    db.session.commit()

    return marca_schema.jsonify(modelo)

@app.route('/models/<int:id>', methods={'DELETE'})
def delete_model(id):
    modelo = Modelo.query.get(id)
    if not modelo:
        return jsonify({'message': 'Modelo não encontrada'}), 404
    
    db.session.delete(modelo)
    db.session.commit()

    return jsonify({'message': 'Modelo excluído'}), 200

## CRUD PARA CARROS

@app.route('/cars', methods=['POST'])
def create_car():
    dados = request.json
    modelo_id = dados['modelo_id']

    modelo = Modelo.query.get(modelo_id)
    if not modelo:
        return jsonify({'message': 'Modelo não encontrado'}), 400
    
    novo_carro = Carro(
        ano=dados['ano'],
        combustivel=dados['combustivel'],
        num_portas=dados['num_portas'],
        cor=dados['cor'],
        modelo_id=modelo_id
    )

    db.session.add(novo_carro)
    db.session.commit()

    return carro_schema.jsonify(novo_carro), 201

@app.route('/cars', methods=['GET'])
def get_cars():
    todos_carros = Carro.query.all()
    return carros_schema.jsonify(todos_carros)

app.route('/cars/<int:id>', methods=['GET'])
def get_car(id):
    carro = Carro.query.get(id)
    if not carro:
        return jsonify({'message': 'Carro não encontrado'}), 404
    return carro_schema.jsonify(carro)


@app.route('/cars/<int:id>', methods=['PUT'])
def update_car(id):
    print("chamou função")
    carro = Carro.query.get(id)
    if not carro:
        return jsonify({'message': 'Carro não encontrado'}), 404
    
    dados = request.json
    print("DADOS", dados)
    modelo_id = dados.get('modelo_id', carro.modelo_id)
    
    if modelo_id != carro.modelo_id:
        modelo = Modelo.query.get(modelo_id)
        if not modelo:
            return jsonify({'message': 'Modelo não encontrado'}), 400
        carro.modelo_id = modelo_id
    
    carro.ano = dados.get('ano', carro.ano)
    carro.combustivel = dados.get('combustivel', carro.combustivel)
    carro.num_portas = dados.get('num_portas', carro.num_portas)
    carro.cor = dados.get('cor', carro.cor)
    
    db.session.commit()
    return carro_schema.jsonify(carro)

@app.route('/cars/<int:id>', methods=['DELETE'])
def delete_car(id):
    carro = Carro.query.get(id)
    if not carro:
        return jsonify({'message': 'Carro não encontrado'}), 404
    
    db.session.delete(carro)
    db.session.commit()
    return jsonify({'message': 'Carro excluído com sucesso'}), 200
