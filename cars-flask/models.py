from app import db

# CRIA ENTIDADE PARA MARCA
class Marca(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome_marca = db.Column(db.String(100), nullable=False, unique=True)

    # RELACIONAMENTO MARCA / MODELO
    modelos = db.relationship('Modelo', backref='marca', lazy=True)

## CRIA ENTIDADE MODELO
class Modelo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    marca_id = db.Column(db.Integer, db.ForeignKey('marca.id'), nullable=False) ## chave estrangeira para marca
    valor_fipe = db.Column(db.Float) 
    nome = db.Column(db.String(100), nullable=False)

    ## relacionamento carro / modelo
    carros = db.relationship('Carro', backref='modelo', lazy=True)

class Carro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp_cadastro = db.Column(db.BigInteger, default=lambda: int(datetime.now().timestamp()))
    ano = db.Column(db.Integer)
    combustivel = db.Column(db.String(50))
    num_portas = db.Column(db.Integer)
    cor = db.Column(db.String(50))

    ## foreign key para modelo
    modelo_id = db.Column(db.Integer, db.ForeignKey('modelo.id'), nullable=False)
    marca_id = db.Column(db.Integer, db.ForeignKey('marca.id'), nullable=False)


## SCHEMAS 
from app import ma
from datetime import datetime

class MarcaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Marca
        load_instance = True

class ModeloSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Modelo
        load_instance = True
        include_fk = True  
class CarroSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Carro
        load_instance = True
        include_fk = True
    
    nome_modelo = ma.String(attribute="modelo.nome")
    nome_marca = ma.String(attribute="modelo.marca.nome_marca")
    valor_fipe = ma.Float(attribute="modelo.valor_fipe")

# Instâncias dos schemas
marca_schema = MarcaSchema()
marcas_schema = MarcaSchema(many=True)

modelo_schema = ModeloSchema()
modelos_schema = ModeloSchema(many=True)

carro_schema = CarroSchema()
carros_schema = CarroSchema(many=True)