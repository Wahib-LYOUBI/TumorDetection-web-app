"use client"

import { useState, useRef } from "react"
import "./ImageUploader.css"

const ImageUploader = ({ onUpload, onSendToBackend, onShowResults, className = "" }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "application/dicom"]
    if (!acceptedTypes.some((type) => file.type === type || file.name.toLowerCase().endsWith(".dcm"))) {
      alert("Please select a valid image file (JPG, PNG, or DICOM)")
      return
    }

    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    // Call the onUpload callback if provided
    onUpload?.(file, url)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      const syntheticEvent = {
        target: { files: [file] },
      }
      handleFileSelect(syntheticEvent)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleDeleteImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSendToBackend = async () => {
    if (!selectedFile || !onSendToBackend) return

    try {
      setIsProcessing(true)

      // Call the backend processing function
      const results = await onSendToBackend(selectedFile)

      // Navigate to results page by calling the callback
      onShowResults?.(selectedFile, previewUrl, results)
    } catch (error) {
      console.error("Error sending to backend:", error)
      alert("Processing failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className={`image-uploader ${className}`}>
      <div className="uploader-header">
        <h2 className="uploader-title">Breast Cancer Tumor Detection</h2>
        <p className="uploader-subtitle">Upload a mammogram image to detect and analyze potential breast cancer tumors using our advanced AI model</p>
      </div>

      <div className="uploader-container">
        {!selectedFile ? (
          <div className="upload-area" onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleUploadClick}>
            <div className="upload-content">
              <div className="upload-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10L12 5L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="upload-text">
                <h3 className="upload-title">Upload Mammogram Image</h3>
                <p className="upload-description">Drag and drop your image here, or click to browse</p>
                <p className="upload-formats">Supported formats: JPG, PNG, DICOM</p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.dcm"
              onChange={handleFileSelect}
              className="file-input"
            />
          </div>
        ) : (
          <div className="preview-container">
            <div className="image-preview">
              <div className="preview-header">
                <h3 className="preview-title">Uploaded Image</h3>
                <button className="upload-btn" onClick={handleUploadClick}>
                  Upload Image
                </button>
              </div>
              <div className="preview-content">
                <div className="image-container">
                  <img src={previewUrl || "/placeholder.svg"} alt="Uploaded image" className="preview-image" />
                  <button onClick={handleDeleteImage} className="delete-btn" aria-label="Delete image">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <div className="file-details">
                  <div className="details-card">
                    <h4 className="details-title">File Details</h4>
                    <p className="detail-item">
                      <span className="detail-label">Name:</span> {selectedFile.name}
                    </p>
                    <p className="detail-item">
                      <span className="detail-label">Size:</span> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="detail-item">
                      <span className="detail-label">Type:</span> {selectedFile.type || "DICOM"}
                    </p>
                  </div>

                  <button
                    onClick={handleSendToBackend}
                    disabled={isProcessing}
                    className={`process-btn ${isProcessing ? "processing" : ""}`}
                  >
                    {isProcessing ? (
                      <span className="btn-content">
                        <div className="spinner"></div>
                        Processing...
                      </span>
                    ) : (
                      <span className="btn-content">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M22 2L11 13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 2L15 22L11 13L2 9L22 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Process Image
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.dcm"
              onChange={handleFileSelect}
              className="file-input"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUploader
