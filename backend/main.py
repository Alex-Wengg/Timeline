from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data_store = {"items": [], "groups": []}


@app.route('/')
def home():
  return "Hello, Flask on Replit!"


@app.route('/save', methods=['POST'])
def save():
  data = request.json
  data_store["items"] = data.get("items", [])
  data_store["groups"] = data.get("groups", [])
  return make_response(jsonify({"message": "Data saved successfully"}), 200)


@app.route('/data', methods=['GET'])
def data():
  return jsonify(data_store)


if __name__ == '__main__':
  app.run(debug=True)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)
