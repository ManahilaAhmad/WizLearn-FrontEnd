import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/Landing/LandingPage';
import Login from './components/pages/Auth/Login';
import Signup from './components/pages/Auth/Signup';
import Dashboard from './components/pages/Dashboard/Dashboard';
import CoursePage from './components/pages/Course/CoursePage';
import ProfilePage from './components/pages/Profile/ProfilePage';
import ChatPage from './components/pages/Chat/ChatPage';

// Admin Imports
import AdminLayout from './components/pages/Admin/AdminLayout';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import AdminCoursesPage from './components/pages/Admin/AdminCoursesPage';
import AdminUsersPage from './components/pages/Admin/AdminUsersPage';
import { AdminProvider } from './components/pages/Admin/AdminContext';

// Main App Component with Router
const App = () => {
  return (
    <BrowserRouter>
      {/* Admin Provider wraps entire app or just admin routes, doing entire app for simplicity if needed, 
          but usually better to wrap just the routes. 
          However, to use Context inside the outlet, we wrap the Route element. */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminProvider>
            <AdminLayout />
          </AdminProvider>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;