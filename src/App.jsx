// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ProfilePage from './components/ProfilePage';
import ChatPage from './components/ChatPage'; // ✅ import chat page

import AdminRoutes from './admin/AdminRoutes';
import { AdminProvider } from './admin/context/AdminContext';

import './styles/custom.css';

// Landing Page (uses components)
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} /> {/* ✅ added chat route */}

        {/* Admin route */}
        <Route
          path="/admin/*"
          element={
            <AdminProvider>
              <AdminRoutes />
            </AdminProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
