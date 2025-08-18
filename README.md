# WS Motors - Cars List

Aplicação Fullstack em React e Flask que exibe uma listagem de veículos agrupada por marcas, com filtros avançados e funcionalidades CRUD (Create, Read, Update, Delete).

---

## 📝 Descrição

Esta aplicação permite:

- Listar carros agrupados por marca.
- Filtrar por:
  - Marca e modelo
  - Número de portas
  - Cor
  - Combustível
  - Ano (range)
  - Valor FIPE (range)
- Criar novos carros, marcas e modelos.
- Editar e deletar carros existentes.
- Resetar filtros aplicados.

O frontend consome dados do backend em Flask, que utiliza SQLite como banco de dados.

---

## 📂 Estrutura do Repositório

```
cars-flask/       # Backend (Python / Flask)
│
├── app.py             # Configuração do Flask, CORS e inicialização do banco
├── models.py          # Modelos do banco (Marca, Modelo, Carro) e schemas Marshmallow
├── routes.py          # Rotas CRUD para carros, marcas e modelos
├── database.db        # Banco SQLite (gerado automaticamente)
│
cars-frontend/     # Frontend (ReactJS)
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── components/
│   │   ├── CarsList/
│   │   ├── CardCar/
│   │   ├── Sidemenu/
│   │   ├── Modal/
│   │   └── ModalCreateNew/
```

---

## ⚡ Tecnologias Utilizadas

**Frontend:**

- ReactJS (Functional Components + Hooks)
- CSS Modules
- Fetch API para comunicação com backend

**Backend:**

- Python 3
- Flask
- Flask-SQLAlchemy
- Flask-Marshmallow
- Flask-CORS
- SQLite

---

## 🎨 Layout

### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <p>Home</p>
  <img alt="WebHome" title="#WebHome" src="https://github.com/JoaoGabrielVargas/cars-list/blob/main/cars-frontend/src/assets/print_home.png" width="800px">
  <p>Modal para criar novo carro</p>
  <img alt="WebNewCarModal" title="#WebNewCarModal" src="https://github.com/JoaoGabrielVargas/cars-list/blob/main/cars-frontend/src/assets/print_new_car_modal.png" width="800px">
  <p>Modal para criar novo modelo</p>
  <img alt="WebNewModelModal" title="#WebNewModelModal" src="https://github.com/JoaoGabrielVargas/cars-list/blob/main/cars-frontend/src/assets/print_new_model_modal.png" width="800px">
  <p>Exemplo de filtros selecionados - Marca "Fiat" - Modelo "Uno" - Número de portas "2", Cor "Roxo"</p>
  <img alt="WebFilterExample1" title="#WebFilterExample1" src="https://github.com/JoaoGabrielVargas/cars-list/blob/main/cars-frontend/src/assets/print_filter_example1.png" width="800px">
  <p>Exemplo de filtros selecionando apenas "Uno" como modelo e sem filtros adicionais, resultando na lista com todos Uno's</p>
  <img alt="WebFilterExample2" title="#WebFilterExample2" src="https://github.com/JoaoGabrielVargas/cars-list/blob/main/cars-frontend/src/assets/print_filter_example2.png" width="800px">
</p>

---

## 🚀 Instalação e Execução

### Backend (cars-flask)

1. Entre no diretório do backend:
```bash
cd cars-flask
```

2. Crie e ative um ambiente virtual (opcional, mas recomendado):
```bash
python -m venv venv
source venv/bin/activate   # Linux / macOS
venv\Scripts\activate      # Windows
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Execute o backend:
```bash
python app.py
```

O backend será iniciado em `http://localhost:5000`.

### Frontend (cars-frontend)

1. Entre no diretório do frontend:
```bash
cd cars-frontend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o frontend:
```bash
npm start
# ou
yarn start
```

O frontend será iniciado em `http://localhost:3000` e se conecta ao backend em `http://localhost:5000`.

---

## 🔧 Rotas do Backend

### Marcas (`/brands`)

| Método | Endpoint           | Descrição                       |
|--------|------------------|---------------------------------|
| GET    | `/brands`          | Lista todas as marcas           |
| POST   | `/brands`          | Cria uma nova marca             |
| GET    | `/brands/<id>`     | Retorna uma marca específica   |
| PUT    | `/brands/<id>`     | Atualiza uma marca existente   |
| DELETE | `/brands/<id>`     | Deleta uma marca               |

### Modelos (`/models`)

| Método | Endpoint           | Descrição                       |
|--------|------------------|---------------------------------|
| GET    | `/models`          | Lista todos os modelos          |
| POST   | `/models`          | Cria um novo modelo             |
| GET    | `/models/<id>`     | Retorna um modelo específico    |
| PUT    | `/models/<id>`     | Atualiza um modelo existente    |
| DELETE | `/models/<id>`     | Deleta um modelo                |

### Carros (`/cars`)

| Método | Endpoint           | Descrição                       |
|--------|------------------|---------------------------------|
| GET    | `/cars`            | Lista todos os carros           |
| POST   | `/cars`            | Cria um novo carro              |
| GET    | `/cars/<id>`       | Retorna um carro específico     |
| PUT    | `/cars/<id>`       | Atualiza um carro existente     |
| DELETE | `/cars/<id>`       | Deleta um carro                 |

---

## 🧩 Componentes Principais (Frontend)

### `CarsList`

- Props:
  - `carsList` (Array): lista de carros.
  - `onDeleteCar` (Function): chamada ao deletar carro.
  - `onEditCar` (Function): chamada ao editar carro.
- Renderiza cada carro com `CardCar`.

### `CardCar`

- Exibe detalhes do carro.
- Botões de **Editar** e **Deletar** com modais.

### `Sidemenu`

- Permite criar carros, marcas e modelos.
- Aplica filtros avançados.
- Atualiza dinamicamente modelos disponíveis ao selecionar marcas.

---

## ⚙️ Lógica de Filtros

Todos os filtros combináveis no frontend:

```javascript
const handleApplyFilters = (filters) => {
  let filtered = [...allCars];

  if (filters.selectedModels.length) filtered = filtered.filter(...);
  else if (filters.selectedBrands.length) filtered = filtered.filter(...);

  if (filters.doors) filtered = filtered.filter(...);
  if (filters.color) filtered = filtered.filter(...);
  if (filters.fuelType) filtered = filtered.filter(...);

  if (filters.minYear && filters.maxYear) filtered = filtered.filter(...);
  if (filters.minValue && filters.maxValue) filtered = filtered.filter(...);

  setCarsList(filtered);
}
```

---

## ✅ Observações Finais

- Aplicação pronta para entrega.
- Frontend e backend bem estruturados e documentados.
- Funcionalidades de CRUD e filtros totalmente implementadas.
- Interface limpa e clara para o usuário.

---
