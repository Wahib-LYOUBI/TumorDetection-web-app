import React, { useState } from 'react';
import axios from 'axios';
import { FaFolderOpen,FaDownload } from 'react-icons/fa';

const TumorDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleFileChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
    setResultImage(null);
    setPrediction('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('imageInput');
    if (!fileInput.files[0]) {
      setError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/predict', formData, {
        responseType: 'blob', // To receive image as a binary blob
      });

      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      setResultImage(imageUrl);
      setPrediction('Image received. You can download it below.');
      setError('');
    } catch (err) {
      console.error(err);
      setError("An error occurred during the prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerText}>Breast Tumor Detection AI</h1>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <h2 style={styles.title}>Upload Image for Prediction</h2>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }} // hide default input
          />

          <label htmlFor="imageInput" style={styles.customFileButton}>
          <FaFolderOpen style={{ marginRight: '10px' }} />
                  Choose Image
          </label>

          {selectedImage && (
            <div>
              <h3>Uploaded Image:</h3>
              <img src={selectedImage} alt="Uploaded" style={styles.image} />
            </div>
          )}
          <button 
            onClick={handleSubmit} 
            style={styles.uploadButton}
          >
            {loading ? 'Analyzing...' : 'Detect Tumor'}
          </button>
          {error && <div style={styles.error}>{error}</div>}
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          {resultImage ? (
            <div>
              <h2>Prediction Result</h2>
              <img src={resultImage} alt="Result" style={styles.resultImage} />
              <p>{prediction}</p>
              <a href={resultImage} download="tumor_prediction.jpg">
                 <button style={styles.downloadButton}>
                    <FaDownload style={{ marginRight: '8px' }} />
                      Download Result
                </button>
              </a>

            </div>
          ) : (
            <h3>No result to display</h3>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'dimgray', // light gray for the whole page
  },
  
  header: {
    backgroundColor: 'dimgray',
    textAlign: 'center',
    padding: '0px',
  },
  headerText: {
    fontSize: '52px', // Larger text
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    marginTop: '0px',
    marginBottom: '50px',
  },
  content: {
    display: 'flex',
    flex: 1,
    fontSize: '20px', // Larger default font
  },
  leftPanel: {
    flex: 1,
    padding: '20px',
    borderRight: '4px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rightPanel: {
    flex: 1,
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '23px', // Increased
    fontWeight: '700',
    marginBottom: '20px',
    color: '#333',
    textTransform: 'uppercase',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '400px',
    marginTop: '20px',
  },
  resultImage: {
    maxWidth: '100%',
    maxHeight: '400px',
    marginTop: '20px',
  },
  uploadButton: {
    padding: '18px 36px',
    fontSize: '22px', // Larger button text
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '30px',
  },
  downloadButton: {
    marginTop: '20px',
    padding: '14px 28px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px', // Bigger font
    cursor: 'pointer',
  },
  subheading: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333', // Dark gray text
    marginTop: '20px',
  },
  customFileButton: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: 'darkslategray',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px',
    transition: 'background-color 0.3s ease',
  },  
  
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '18px',
  },
};


export default TumorDetection;
