🍃 Tea Leaf Quality Gradifier

A Machine Learning + Mobile App project to classify tea leaves into quality grades using images.

This project is built for Sri Lanka’s tea industry to help farmers, factories, and buyers quickly identify tea quality using a mobile phone.

🎯 Features

Classifies tea leaves into:

OP1

BOP

Dust

Reject

Handles imbalanced datasets using class weights

CNN model built with TensorFlow

Converts model to TFLite for mobile use

React Native (Expo) mobile app

Future: Price prediction based on grade

🧠 Tech Stack
Machine Learning

Python 3.10

TensorFlow / Keras

NumPy, Scikit-learn

Pillow, Matplotlib

Mobile App

React Native

Expo

JavaScript

📁 Project Structure
tea_quality_gradifier/
│
├── data/
│   └── raw/
│       ├── OP1/
│       ├── BOP/
│       ├── Dust/
│       └── Reject/
│
├── models/
│   ├── cnn_tea_classifier.h5
│   └── mobile_model.tflite
│
├── ML/
│   └── src/
│       ├── model_training.py
│       ├── test_one_image.py
│       └── preprocessing.py
│
├── Mobile-App/
│   └── mobile_app/
│
└── README.md

⚙️ Setup ML Environment
1. Install Python 3.10

Make sure:

python --version


Shows:

Python 3.10.x

2. Install Libraries
pip install tensorflow numpy scikit-learn pillow matplotlib

3. Train Model
cd ML/src
python model_training.py


Model will be saved to:

models/cnn_tea_classifier.h5

4. Test One Image

Edit image path in:

test_one_image.py


Run:

python test_one_image.py

📱 Run Mobile App
cd Mobile-App/mobile_app
npx expo start


Install Expo Go on your phone

Scan QR code

App opens on your phone

🚀 Future Improvements

Add real-time camera prediction

Price prediction based on grade

Cloud API backend

Farmer-friendly UI

Multi-language support

👨‍💻 Authors

Developed by:
Tea Leaf Quality Gradifier Team
Sri Lanka 🇱🇰
