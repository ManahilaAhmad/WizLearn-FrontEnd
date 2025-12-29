import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import MaterialTable from "../components/MaterialTable";
import { AdminProvider } from "../context/AdminContext";
import "./../admin.css";

export default function MaterialsPage() {
  return (
    <AdminProvider>
      <div className="admin-shell">
        <Topbar />
        <div className="admin-main">
          <Sidebar />
          <main className="admin-content">
            <div className="page-header">
              <h2>Materials</h2>
              <button className="btn btn-yellow">+ Upload Material</button>
            </div>

            <MaterialTable />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}