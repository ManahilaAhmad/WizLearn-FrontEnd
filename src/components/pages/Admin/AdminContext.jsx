import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    // Mock Data for Courses
    const [courses, setCourses] = useState([
        { id: 'DS-2024-001', title: 'Data Structures & Algorithms', createdBy: 'Prof. Smith', lessons: 42, students: 15, date: 'Jan 15, 2024', progress: 85 },
        { id: 'WD-2024-002', title: 'Web Development Bootcamp', createdBy: 'Sarah Dev', lessons: 56, students: 23, date: 'Feb 20, 2024', progress: 60 },
        { id: 'ML-2024-003', title: 'Machine Learning Fundamentals', createdBy: 'Dr. Turing', lessons: 38, students: 18, date: 'Mar 10, 2024', progress: 45 },
    ]);

    // Mock Data for Users
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
        { id: 4, name: 'David Lee', email: 'david@example.com' },
        { id: 5, name: 'Eve Wilson', email: 'eve@example.com' },
    ]);

    const deleteCourse = (id) => {
        setCourses(prev => prev.filter(c => c.id !== id));
    };

    const deleteUser = (id) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    return (
        <AdminContext.Provider value={{ courses, users, deleteCourse, deleteUser }}>
            {children}
        </AdminContext.Provider>
    );
};
