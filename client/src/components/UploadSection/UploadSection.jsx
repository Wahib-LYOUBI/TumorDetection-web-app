import React, { useState } from 'react';
import { Upload, Eye, X } from 'lucide-react';
import './UploadSection.css';

export default function UploadSection({ onAnalyze }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    await onAnalyze(selectedFile, imagePreview);
    setIsAnalyzing(false);
    // No need to clear manually — parent hides this view
  };

  const clearImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    document.getElementById('imageInput').value = '';
  };

  return (
    <div className="container">
      <div className="main-card">
        <h2 className="title">Upload image</h2>
        <p className='note'>Upload a high-quality mammogram image for analysis</p>

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
              <p className="upload-text">Upload Mammogram Image</p>
              <p className="upload-subtext">Drag and drop your image here, or click to browse</p>
            </label>
          </div>
        </div>

        {imagePreview && (
          <div className="preview-section">
            <div className="preview-container">
              <div className="preview-header">
                <h2 className="preview-title">Image Preview</h2>
                <button onClick={clearImage} className="clear-button">
                  <X className="clear-icon" />
                </button>
              </div>

              <div className="image-container">
                <img src={imagePreview} alt="Preview" className="preview-image" />
              </div>

              <div className="button-container">
                <button
                  onClick={handleAnalyzeClick}
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
  