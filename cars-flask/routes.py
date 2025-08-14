from app import app

@app.route('/brands', methods=['GET'])
def hello_world():
    return "Hello World"