import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import './Segmentation.css';

export default function Segmentation({ originalImage, resultImage, onGoBack }) {
  
  const handleDownload = () => {
    // Create download link
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `analyzed_image_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="comparison-container">
      <div className="comparison-card">
        {/* Header */}
        <div className="comparison-header">
          <button onClick={onGoBack} className="back-button">
            <ArrowLeft className="back-icon" />
            Back to Upload
          </button>
          <h1 className="comparison-title">Results</h1>
          <button onClick={handleDownload} className="download-button">
            <Download className="download-icon" />
            Download Result
          </button>
        </div>

        {/* Images Comparison */}
        <div className="images-container">
          {/* Original Image */}
          <div className="image-section">
            <h2 className="image-title">Original Image</h2>
            <div className="image-wrapper">
              <img
                src={originalImage}
                alt="Original"
                className="comparison-image"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-line"></div>
          </div>

          {/* Result Image */}
          <div className="image-section">
            <h2 className="image-title">Segmentation Result</h2>
            <div className="image-wrapper">
              <img
                src={resultImage}
                alt="Analysis Result"
                className="comparison-image"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions-container">
          <button onClick={onGoBack} className="secondary-button">
            Analyze Another Image
          </button>
          <button onClick={handleDownload} className="primary-button">
            <Download className="button-icon" />
            Download Result
          </button>
        </div>
      </div>
    </div>
  );
}