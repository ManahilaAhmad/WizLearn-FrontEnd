import React from "react";

const HowItWorks = () => {
  const steps = [
    { number: "01", title: "Create Your Account", description: "Sign up for free..." },
    { number: "02", title: "Add Your Courses", description: "Upload study materials..." },
    { number: "03", title: "Let AI Assist You", description: "Generate quizzes, roadmaps..." },
    { number: "04", title: "Collaborate & Excel", description: "Share courses with friends..." }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <h2 className="section-title">How WizLearn Works</h2>
        <p className="section-subtitle">Get started in four simple steps</p>

        <div className="row g-4">
          {steps.map((s, i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <div>
                <div className="step-number">{s.number}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-description">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
