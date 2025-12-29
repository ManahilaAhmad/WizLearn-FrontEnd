// components/UserTable.jsx
import React from "react";
import { useAdmin } from "../context/AdminContext";

export default function UserTable() {
  const { users, deleteUser } = useAdmin();

  return (
    <table className="table table-striped table-hover mt-3">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
