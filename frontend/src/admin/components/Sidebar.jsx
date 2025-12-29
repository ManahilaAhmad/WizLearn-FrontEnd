// components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./../admin.css";

export default function Sidebar() {
  return (
    <aside className="admin-sidebar mt-0">
      <div className="sidebar-inner">
        <div className="sidebar-section">
          <h4 className="sidebar-title">Admin</h4>
          <NavLink to="/admin" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/courses" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
            Courses
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
            Users
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
