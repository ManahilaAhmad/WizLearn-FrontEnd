import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FaBrain, FaRoad, FaComments, FaBook, FaUsers, FaChartLine, FaBars, FaTimes } from 'react-icons/fa';
import { MdQuiz } from 'react-icons/md';
import ProfilePage from './components/ProfilePage';

// Navigation Component
const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
      <div className="container">
        <Link className="navbar-brand navbar-brand-custom" to="/">
          <FaBrain style={{ color: '#F0D459', fontSize: '2rem' }} />
          WizLearn
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#features" onClick={() => setIsOpen(false)}>Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#how-it-works" onClick={() => setIsOpen(false)}>How It Works</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about" onClick={() => setIsOpen(false)}>About</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
            </li>
            <li className="nav-item d-lg-none">
              <a className="nav-link" href="#login" onClick={() => setIsOpen(false)}>Login</a>
            </li>
            <li className="nav-item d-none d-lg-block">
              <button className="btn btn-outline-custom ms-2">Login</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary-custom ms-lg-2 mt-2 mt-lg-0">Get Started</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="hero-title">
              Master Your Studies with <span className="highlight">AI-Powered</span> Learning
            </h1>
            <p className="hero-text">
              WizLearn transforms your study materials into personalized learning experiences. Create courses, generate quizzes, build roadmaps, and collaborate with friends—all powered by artificial intelligence.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <button className="btn btn-hero-primary">Start Learning Free</button>
              <button className="btn btn-hero-secondary">Watch Demo</button>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="hero-card">
              <div className="course-card">
                <div className="d-flex align-items-center mb-3">
                  <div className="course-icon me-3">
                    <FaBook />
                  </div>
                  <div>
                    <h3 className="mb-1" style={{ color: '#1D2A50', fontWeight: 'bold', fontSize: '1.25rem' }}>Data Structures</h3>
                    <p className="mb-0" style={{ color: '#718096', fontSize: '0.875rem' }}>42 lessons • 85% complete</p>
                  </div>
                </div>
                <div className="progress-bar-custom">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="row g-3">
                <div className="col-6">
                  <div style={{ 
                    backgroundColor: 'rgba(240, 212, 89, 0.2)', 
                    borderRadius: '0.75rem', 
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <MdQuiz style={{ color: '#F0D459', fontSize: '2.5rem', marginBottom: '0.5rem' }} />
                    <p style={{ color: 'white', fontWeight: '600', margin: 0 }}>AI Quizzes</p>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ 
                    backgroundColor: 'rgba(240, 212, 89, 0.2)', 
                    borderRadius: '0.75rem', 
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <FaRoad style={{ color: '#F0D459', fontSize: '2.5rem', marginBottom: '0.5rem' }} />
                    <p style={{ color: 'white', fontWeight: '600', margin: 0 }}>Smart Roadmaps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      icon: <FaBook />,
      title: "Course Creation",
      description: "Easily create and organize courses. Upload your study materials and let AI help structure your learning path."
    },
    {
      icon: <MdQuiz />,
      title: "AI-Generated Quizzes",
      description: "Test your knowledge with intelligent quizzes automatically generated from your course materials."
    },
    {
      icon: <FaRoad />,
      title: "Smart Roadmaps",
      description: "Get personalized study roadmaps that help you meet deadlines and master topics efficiently."
    },
    {
      icon: <FaBrain />,
      title: "AI Tutor Assistance",
      description: "Receive instant help understanding complex concepts with our AI-powered learning assistant."
    },
    {
      icon: <FaUsers />,
      title: "Collaborative Learning",
      description: "Share courses with friends and study together. Enable view-only mode for secure sharing."
    },
    {
      icon: <FaChartLine />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and performance insights."
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="section-title">Powerful Features for Smarter Learning</h2>
        <p className="section-subtitle">
          Everything you need to transform your study routine and achieve academic excellence
        </p>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card feature-card">
                <div className="card-body">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Component
const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up for free and access your personalized learning dashboard in seconds."
    },
    {
      number: "02",
      title: "Add Your Courses",
      description: "Click the + button to create courses and upload your study materials, notes, and resources."
    },
    {
      number: "03",
      title: "Let AI Assist You",
      description: "Generate quizzes, create study roadmaps, and get instant help understanding complex topics."
    },
    {
      number: "04",
      title: "Collaborate & Excel",
      description: "Share courses with friends, chat, and achieve your academic goals together."
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <h2 className="section-title">How WizLearn Works</h2>
        <p className="section-subtitle">
          Get started in four simple steps and revolutionize your learning experience
        </p>

        <div className="row g-4">
          {steps.map((step, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div>
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Component
const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="cta-title">Ready to Transform Your Learning?</h2>
            <p className="cta-text">
              Join thousands of students who are already achieving better results with WizLearn
            </p>
            <button className="btn btn-hero-primary btn-lg">Get Started for Free</button>
            <p className="cta-note">No credit card required • Free forever</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer id="about" className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="footer-brand">
              <FaBrain style={{ color: '#F0D459', fontSize: '2rem' }} />
              WizLearn
            </div>
            <p className="footer-description">
              AI-powered learning platform designed to help students excel in their studies.
            </p>
          </div>

          <div className="col-md-6 col-lg-3">
            <h4 className="footer-title">Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-3">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-3">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 WizLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Landing Page Component
const LandingPage = () => {
  return (
    <>
      <NavigationBar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
};


// Main App Component with Router
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;