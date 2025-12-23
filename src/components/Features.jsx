import React from "react";
import { FaBook, FaBrain, FaRoad, FaUsers, FaChartLine } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";

const Features = () => {
  const features = [
    { icon: <FaBook />, title: "Course Creation", description: "Easily create and organize courses..." },
    { icon: <MdQuiz />, title: "AI-Generated Quizzes", description: "Test your knowledge..." },
    { icon: <FaRoad />, title: "Smart Roadmaps", description: "Get personalized study roadmaps..." },
    { icon: <FaBrain />, title: "AI Tutor Assistance", description: "Receive instant help..." },
    { icon: <FaUsers />, title: "Collaborative Learning", description: "Share courses..." },
    { icon: <FaChartLine />, title: "Progress Tracking", description: "Monitor your progress..." }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="section-title">Powerful Features for Smarter Learning</h2>
        <p className="section-subtitle">
          Everything you need to transform your study routine
        </p>

        <div className="row g-4">
          {features.map((f, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="card feature-card">
                <div className="card-body">
                  <div className="feature-icon">{f.icon}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-description">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
