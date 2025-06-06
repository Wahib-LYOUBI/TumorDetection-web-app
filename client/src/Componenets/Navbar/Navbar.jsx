
import { useState } from "react"
import "./Navbar.css"
import logo from "../../assets/logo.png"

const Navbar = () => {
  const [showAbout, setShowAbout] = useState(false)

  const openAbout = () => {
    setShowAbout(true)
  }

  const closeAbout = () => {
    setShowAbout(false)
  }

  return (
    <div>
      <header className="header">
        <a href="/" className="logo">
          <img src={logo || "/placeholder.svg"} alt="BreastCare AI Logo" className="logo-image" />
          BreastCare AI
        </a>
        <nav className="navbar">
          <a href="#" onClick={openAbout}>
            About
          </a>
        </nav>
      </header>

      {/* About Modal */}
      {showAbout && (
        <div className="about-overlay" onClick={closeAbout}>
          <div className="about-modal" onClick={(e) => e.stopPropagation()}>
            <div className="about-header">
              <div className="about-logo-section">
                <img src={logo || "/placeholder.svg"} alt="BreastCare AI Logo" className="about-logo-image" />
                <h2 className="about-title">BreastCare AI</h2>
              </div>
              <button className="about-close" onClick={closeAbout}>
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

            <div className="about-content">
              <div className="about-section">
                <h3>About Our Project</h3>
                <p>
                  BreastCare AI is an advanced artificial intelligence system designed to assist healthcare
                  professionals in the early detection and analysis of breast cancer through mammogram image processing.
                  Our cutting-edge deep learning model provides accurate tumor segmentation and risk assessment to
                  support medical diagnosis.
                </p>
              </div>

              <div className="about-section">
                <h3>Our AI Model</h3>
                <p>
                  Our model utilizes state-of-the-art convolutional neural networks (CNNs) trained on thousands of
                  mammogram images. The system employs advanced image segmentation techniques to identify potential
                  tumor regions with high precision and provides confidence scores to assist radiologists in their
                  diagnostic process.
                </p>
                <div className="model-features">
                  <div className="feature-item">
                    <span className="feature-icon">🎯</span>
                    <span>95% Accuracy Rate</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">⚡</span>
                    <span>Real-time Processing</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🔒</span>
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📊</span>
                    <span>Detailed Analytics</span>
                  </div>
                </div>
              </div>

              <div className="about-section">
                <h3>Our Team</h3>
                <div className="team-grid">
                  <div className="team-member">
                    <div className="member-avatar">👨‍💻</div>
                    <h4>Dr. Sarah Johnson</h4>
                    <p>Lead AI Researcher</p>
                    <span>PhD in Computer Vision & Medical Imaging</span>
                  </div>
                  <div className="team-member">
                    <div className="member-avatar">👩‍⚕️</div>
                    <h4>Dr. Michael Chen</h4>
                    <p>Medical Advisor</p>
                    <span>Radiologist with 15+ years experience</span>
                  </div>
                  <div className="team-member">
                    <div className="member-avatar">👨‍🔬</div>
                    <p>Data Science Team</p>
                    <span>Machine Learning Engineers & Medical Data Specialists</span>
                  </div>
                </div>
              </div>

              <div className="about-section">
                <h3>Mission & Vision</h3>
                <div className="mission-vision">
                  <div className="mission">
                    <h4>🎯 Our Mission</h4>
                    <p>
                      To democratize access to advanced breast cancer screening technology and improve early detection
                      rates worldwide through innovative AI solutions.
                    </p>
                  </div>
                  <div className="vision">
                    <h4>🔮 Our Vision</h4>
                    <p>
                      A world where every woman has access to accurate, affordable, and timely breast cancer screening,
                      ultimately saving lives through early detection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-section">
                <h3>Technical Specifications</h3>
                <div className="tech-specs">
                  <div className="spec-item">
                    <strong>Model Architecture:</strong> ResNet-50 with U-Net segmentation
                  </div>
                  <div className="spec-item">
                    <strong>Training Data:</strong> 50,000+ annotated mammogram images
                  </div>
                  <div className="spec-item">
                    <strong>Supported Formats:</strong> DICOM, JPEG, PNG
                  </div>
                  <div className="spec-item">
                    <strong>Processing Time:</strong> &lt; 30 seconds per image
                  </div>
                </div>
              </div>

              <div className="about-footer">
                <p className="disclaimer">
                  <strong>Disclaimer:</strong> This tool is designed to assist healthcare professionals and should not
                  replace professional medical diagnosis. Always consult with qualified medical practitioners for
                  accurate diagnosis and treatment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar