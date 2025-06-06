"use client"

import { useState } from "react"
import "./Results.css"

const Results = ({ originalFile, originalImageUrl, segmentationResult, onBackToUpload, onDownloadResult }) => {
  const [fullscreenImage, setFullscreenImage] = useState(null)

  const handleAnalyzeAnother = () => {
    onBackToUpload?.()
  }

  const handleDownloadResult = () => {
    onDownloadResult?.()
  }

  const openFullscreen = (imageUrl, title) => {
    setFullscreenImage({ url: imageUrl, title })
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <h2 className="results-title">Breast Cancer Tumor Detection</h2>
        <p className="results-subtitle">
          Upload a mammogram image to detect and analyze potential breast cancer tumors using our advanced AI model
        </p>
      </div>

      <div className="results-container">
        <div className="results-nav">
          <h3 className="results-center-title">Results</h3>
        </div>

        <div className="images-section">
          <div className="image-column">
            <h4 className="image-column-title">Original Image</h4>
            <div className="image-container">
              <img
                src={originalImageUrl || "/placeholder.svg"}
                alt="Original mammogram"
                className="result-image"
                onClick={() => openFullscreen(originalImageUrl, "Original Image")}
              />
              <button
                className="fullscreen-btn"
                onClick={() => openFullscreen(originalImageUrl, "Original Image")}
                aria-label="View fullscreen"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 3H5C3.89543 3 3 3.89543 3 5V8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 8V5C21 3.89543 20.1046 3 19 3H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 21H19C20.1046 21 21 20.1046 21 19V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 16V19C3 20.1046 3.89543 21 5 21H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="image-column">
            <h4 className="image-column-title">Segmentation Result</h4>
            <div className="image-container">
              <img
                src={segmentationResult?.processedImageUrl || "/placeholder.svg"}
                alt="Analysis Result"
                className="result-image"
                onClick={() => openFullscreen(segmentationResult?.processedImageUrl, "Segmentation Result")}
              />
              <button
                className="fullscreen-btn"
                onClick={() => openFullscreen(segmentationResult?.processedImageUrl, "Segmentation Result")}
                aria-label="View fullscreen"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 3H5C3.89543 3 3 3.89543 3 5V8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 8V5C21 3.89543 20.1046 3 19 3H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 21H19C20.1046 21 21 20.1046 21 19V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 16V19C3 20.1046 3.89543 21 5 21H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bottom-actions">
          <button className="analyze-another-btn" onClick={handleAnalyzeAnother}>
            Analyze Another Image
          </button>
          <button className="download-bottom-btn" onClick={handleDownloadResult}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download Result
          </button>
        </div>
      </div>

      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <div className="fullscreen-header">
              <h3 className="fullscreen-title">{fullscreenImage.title}</h3>
              <button className="fullscreen-close" onClick={closeFullscreen}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="fullscreen-image-container">
              <img
                src={fullscreenImage.url || "/placeholder.svg"}
                alt={fullscreenImage.title}
                className="fullscreen-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Results
