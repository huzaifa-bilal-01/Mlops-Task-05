from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_url_path="/static", static_folder="static")

# Access MongoDB URI from environment variables
app.config['MONGO_URI'] = os.getenv('MONGO_URI')

mongo = PyMongo(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    if data:
        # Insert data into the "Mlops" collection in the "Demo" database
        mongo.db.Demo.Mlops.insert_one(data)
        return jsonify({'message': 'User info saved successfully'}), 200
    else:
        return jsonify({'error': 'No data received'}), 400



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8081)
