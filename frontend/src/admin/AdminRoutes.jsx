// AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import UsersPage from "./pages/UsersPage";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { AdminProvider } from "./context/AdminContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";

export default function AdminRoutes() {
  return (
    <AdminProvider>
      <div className="admin-shell">
        <Topbar />
        <div className="admin-main d-flex">
          <Sidebar />
          <main className="admin-content flex-grow-1 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
