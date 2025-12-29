// components/Topbar.jsx
import React from "react";

export default function Topbar() {
  return (
    <header className="admin-topbar d-flex justify-content-between align-items-center px-3">
      <div className="brand-logo fw-bold">WizLearn</div>
      <button className="btn btn-warning">Logout</button>
    </header>
  );
}
