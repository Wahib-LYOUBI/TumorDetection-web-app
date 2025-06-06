"use client"

import { useState } from "react"
import Navbar from "./Componenets/Navbar/Navbar.jsx"
import ImageUploader from "./Componenets/ImageUploader/ImageUploader.jsx"
import Results from "./Componenets/Results/Results.jsx"

const App = () => {
  // State to control which view to show
  const [currentView, setCurrentView] = useState("upload") // "upload" or "results"
  const [resultsData, setResultsData] = useState(null)

  const handleUpload = (file, url) => {
    console.log("Image uploaded:", file.name)
    console.log("Preview URL:", url)
  }

  const handleSendToBackend = async (file) => {
    console.log("Sending to backend:", file.name)

    // Simulate API call to backend
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real application, you would use fetch or axios to send the file
    // Example:
    // const formData = new FormData()
    // formData.append('image', file)
    // const response = await fetch('/api/process-image', {
    //   method: 'POST',
    //   body: formData
    // })
    // return response.json()

    console.log("Processing complete!")

    // Return mock results (in real app, this would come from your backend)
    return {
      confidence: 87.5,
      processedImageUrl: "/placeholder.svg", // This would be the actual processed image URL from backend
    }
  }

  // This function is called when "Process Image" is clicked
  const handleShowResults = (originalFile, originalImageUrl, segmentationResult) => {
    setResultsData({
      originalFile,
      originalImageUrl,
      segmentationResult,
    })
    setCurrentView("results") // Switch to results view
  }

  // This function is called when "Back to Upload" or "Analyze Another Image" is clicked
  const handleBackToUpload = () => {
    setCurrentView("upload") // Switch back to upload view
    setResultsData(null)
  }

  const handleDownloadResult = () => {
    // Create a downloadable report
    const reportData = {
      fileName: resultsData?.originalFile?.name,
      analysisDate: new Date().toISOString(),
      results: resultsData?.segmentationResult,
    }

    const dataStr = JSON.stringify(reportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = `analysis-report-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <Navbar />
      {currentView === "upload" ? (
        <ImageUploader
          onUpload={handleUpload}
          onSendToBackend={handleSendToBackend}
          onShowResults={handleShowResults} // Pass this callback to ImageUploader
        />
      ) : (
        <Results
          originalFile={resultsData?.originalFile}
          originalImageUrl={resultsData?.originalImageUrl}
          segmentationResult={resultsData?.segmentationResult}
          onBackToUpload={handleBackToUpload}
          onDownloadResult={handleDownloadResult}
        />
      )}
    </div>
  )
}

export default App
