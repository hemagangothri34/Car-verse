# app.py (Corrected version)
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
import numpy as np
import re
import nltk
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('punkt')
nltk.download('wordnet')

app = Flask(__name__)

# ======================
# PRICE PREDICTION MODULE (Corrected)
# ======================
class CarPricePredictor:
    def __init__(self):
        self.features = ['year', 'mileage', 'engine_size', 'fuel_type']  # MOVED THIS LINE UP
        self.model = self.train_model()
        
    def train_model(self):
        # Sample dataset
        data = {
            'year': [2015, 2018, 2020, 2016, 2019],
            'mileage': [50000, 30000, 15000, 70000, 25000],
            'engine_size': [1.6, 2.0, 1.5, 1.8, 2.4],
            'fuel_type': ['Petrol', 'Diesel', 'Petrol', 'Diesel', 'Petrol'],
            'price': [12000, 18000, 22000, 15000, 25000]
        }
        df = pd.DataFrame(data)
        
        # Convert categorical to numerical
        df['fuel_type'] = df['fuel_type'].map({'Petrol': 0, 'Diesel': 1, 'Electric': 2})
        
        # Train model
        model = RandomForestRegressor(n_estimators=100)
        model.fit(df[self.features], df['price'])
        
        joblib.dump(model, 'car_price_model.pkl') 
        return model

    def predict_price(self, input_data):
        try:
            input_df = pd.DataFrame([input_data])
            input_df['fuel_type'] = input_df['fuel_type'].map({'Petrol': 0, 'Diesel': 1, 'Electric': 2})
            prediction = self.model.predict(input_df[self.features])
            return float(prediction[0])
        except Exception as e:
            print(f"Prediction error: {e}")
            return None

# ======================
# CHATBOT MODULE
# ======================
class CarChatbot:
    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
        self.vectorizer = TfidfVectorizer()
        self.initialize_responses()
        
    def initialize_responses(self):
        self.qa_pairs = {
            "greeting": ["hi", "hello", "hey"],
            "services": ["what services", "help", "support"],
            "buying": ["how to buy", "purchase process"],
            "selling": ["sell my car", "valuation"],
            "renting": ["rent a car", "rental options"]
        }
        
        self.responses = {
            "greeting": "Hello! Welcome to DreamCar. How can I assist you today?",
            "services": "We offer: 1) Car Buying 2) Selling Assistance 3) Rentals 4) Valuation Services",
            "buying": "Our buying process: 1) Search cars 2) Schedule test drive 3) Financing options 4) Complete purchase",
            "selling": "To sell your car: 1) Get instant valuation 2) Schedule inspection 3) Receive offers 4) Complete paperwork",
            "renting": "Rental options include daily/weekly/monthly plans with insurance coverage included.",
            "default": "I'm sorry, I didn't understand. Could you rephrase your question?"
        }
        
        # Prepare TF-IDF vectors
        all_questions = [q for sublist in self.qa_pairs.values() for q in sublist]
        self.vectorizer.fit(all_questions)

    def preprocess_text(self, text):
        text = text.lower()
        tokens = nltk.word_tokenize(text)
        tokens = [self.lemmatizer.lemmatize(token) for token in tokens]
        return ' '.join(tokens)

    def get_response(self, user_input):
        processed_input = self.preprocess_text(user_input)
        input_vec = self.vectorizer.transform([processed_input])
        
        best_score = 0
        best_category = "default"
        
        for category, questions in self.qa_pairs.items():
            question_vecs = self.vectorizer.transform(questions)
            similarity = cosine_similarity(input_vec, question_vecs)
            max_score = similarity.max()
            
            if max_score > best_score:
                best_score = max_score
                best_category = category
                
        return self.responses.get(best_category, self.responses["default"])

# ======================
# API ENDPOINTS
# ======================
price_predictor = CarPricePredictor()
chatbot = CarChatbot()

@app.route('/predict_price', methods=['POST'])
def predict_price():
    data = request.json
    required_fields = ['year', 'mileage', 'engine_size', 'fuel_type']
    
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
        
    prediction = price_predictor.predict_price(data)
    if prediction:
        return jsonify({'predicted_price': prediction})
    else:
        return jsonify({'error': 'Prediction failed'}), 500

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
        
    response = chatbot.get_response(user_message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)