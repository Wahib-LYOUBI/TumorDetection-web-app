import React from 'react'
import Header from './components/Header/Header'
import UploadSection from './components/UploadSection/UploadSection'
import './App.css'

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <h1 className='Description'>Breast Cancer Tumor Detection</h1>
      <p className='dec'>Upload a mammogram image to detect and analyze potential breast cancer tumors using our advanced AI model</p>
      <UploadSection/>
    </div>
  )
}

export default App

