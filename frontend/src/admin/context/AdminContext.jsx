import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  // Dummy data for testing
  const [courses, setCourses] = useState([
    { id: 1, title: "React Basics", lessonsCount: 10, studentsCount: 50 },
    { id: 2, title: "Node.js Fundamentals", lessonsCount: 8, studentsCount: 35 },
    { id: 3, title: "Python for Beginners", lessonsCount: 12, studentsCount: 40 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Ali Khan", email: "ali@example.com" },
    { id: 2, name: "Sara Ahmed", email: "sara@example.com" },
    { id: 3, name: "Hassan Malik", email: "hassan@example.com" },
  ]);

  const [loading, setLoading] = useState({
    courses: false,
    users: false,
  });

  const [error, setError] = useState(null);

  // Delete helpers (just remove from dummy data for now)
  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // Optional: refresh function resets to original dummy data
  const refreshAll = () => {
    setCourses([
      { id: 1, title: "React Basics", lessonsCount: 10, studentsCount: 50 },
      { id: 2, title: "Node.js Fundamentals", lessonsCount: 8, studentsCount: 35 },
      { id: 3, title: "Python for Beginners", lessonsCount: 12, studentsCount: 40 },
    ]);

    setUsers([
      { id: 1, name: "Ali Khan", email: "ali@example.com" },
      { id: 2, name: "Sara Ahmed", email: "sara@example.com" },
      { id: 3, name: "Hassan Malik", email: "hassan@example.com" },
    ]);
  };

  return (
    <AdminContext.Provider
      value={{
        courses,
        users,
        loading,
        error,
        deleteCourse,
        deleteUser,
        refreshAll,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
