import React, { useState } from 'react';
import Header from './components/Header/Header';
import UploadSection from './components/UploadSection/UploadSection';
import Segmentation from './components/Segmentation/Segmentation';
import './App.css';

const App = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const handleAnalyze = async (file, previewUrl) => {
    setOriginalImage(previewUrl); // For displaying in Segmentation

    const formData = new FormData();
    formData.append('mammogram', file);

    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        body: formData,
      });

      const blob = await response.blob();
      const resultUrl = URL.createObjectURL(blob);
      setResultImage(resultUrl);
    } catch (error) {
      console.error('Segmentation failed:', error);
    }
  };

  const handleGoBack = () => {
    setOriginalImage(null);
    setResultImage(null);
  };

  return (
    <div className='container'>
      <Header />
      <h1 className='Description'>Breast Cancer Tumor Detection</h1>
      <p className='dec'>
        Upload a mammogram image to detect and analyze potential breast cancer tumors using our advanced AI model
      </p>

      {!resultImage ? (
        <UploadSection onAnalyze={handleAnalyze} />
      ) : (
        <Segmentation
          originalImage={originalImage}
          resultImage={resultImage}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
};

export default App;
