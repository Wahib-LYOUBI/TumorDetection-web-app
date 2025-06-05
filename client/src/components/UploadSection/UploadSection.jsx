import React, { useState } from 'react';
import { Upload, Eye, X } from 'lucide-react';
import './UploadSection.css';

export default function UploadSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Reset analysis when new image is uploaded
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      const mockAnalysis = {
        fileName: selectedImage.name,
        fileSize: (selectedImage.size / 1024).toFixed(2) + ' KB',
        imageType: selectedImage.type,
        dimensions: 'Analyzing...',
        colors: ['#FF6B35', '#2E86AB', '#A23B72', '#F18F01'],
        features: [
          'High contrast detected',
          'Multiple objects identified',
          'Good image quality',
          'Standard resolution'
        ]
      };
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    // Reset file input
    document.getElementById('imageInput').value = '';
  };

  return (
    <div className="container">
      <div className="main-card">
        <h2 className="title">
          Upload image
        </h2>
        <p className='note'>Upload a high-quality mammogram image for analysis</p>
       
        
        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-area">
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            <label htmlFor="imageInput" className="upload-label">
              <Upload className="upload-icon" />
              <p className="upload-text">
                Upload Mammogram Image
              </p>
              <p className="upload-subtext">
                Drag and drop your image here, or click to browse
              </p>
            </label>
          </div>
        </div>

        {/* Image Preview Container */}
        {imagePreview && (
          <div className="preview-section">
            <div className="preview-container">
              <div className="preview-header">
                <h2 className="preview-title">
                  Image Preview
                </h2>
                <button onClick={clearImage} className="clear-button">
                  <X className="clear-icon" />
                </button>
              </div>
              
              <div className="image-container">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                />
              </div>
              
              <div className="button-container">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="analyze-button"
                >
                  <Eye className="button-icon" />
                  {isAnalyzing ? 'Analyzing...' : 'Proceed to Segmentation'}
                </button>
              </div>
              
              {isAnalyzing && (
                <div className="loading-container">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}