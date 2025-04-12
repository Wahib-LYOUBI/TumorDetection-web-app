# TumorDetection Web App

This is a full-stack web application designed for **AI-based tumor segmentation** using deep learning models. The frontend is built with **React** and the backend with **Flask**.

##  Features

- Upload medical images for tumor detection.
- AI-based segmentation using a pre-trained deep learning model.
- Display results of tumor detection on the uploaded images.


##  Setup

### Backend (Flask)

1. Create a Python virtual environment:
   ```bash
   cd server
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

2. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
3. Set up environment variables in .env file
4. Run the Flask app:
   ```bash
   python run.py

### Frontend (React)
1. Go to the client/ directory:
   ```bash
   cd client
2. Install the required Node dependencies:
   ```bash
   npm install
3. Start the React app:
   ```bash
   npm start


