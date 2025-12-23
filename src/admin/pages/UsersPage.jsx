// pages/UsersPage.jsx
import React from "react";
import UserTable from "../components/UserTable";

export default function UsersPage() {
  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <UserTable />
    </div>
  );
}
