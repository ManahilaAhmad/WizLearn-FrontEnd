import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

import { FaBook, FaUsers, FaClock, FaEdit, FaChartBar, FaTrash } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function AdminDashboard() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Dummy data
    const usersPerMonth = [5, 8, 12, 9, 15, 18, 20, 22, 17, 25, 30, 28];
    const coursesPerMonth = [2, 3, 4, 3, 5, 6, 7, 8, 5, 6, 7, 8];

    const recentCourses = [
        {
            title: "Data Structures & Algorithms",
            code: "DS-2024-001",
            lessons: 42,
            students: 15,
            date: "Jan 15, 2024",
            progress: 85,
        },
        {
            title: "Web Development Bootcamp",
            code: "WD-2024-002",
            lessons: 56,
            students: 23,
            date: "Feb 20, 2024",
            progress: 60,
        },
        {
            title: "Machine Learning Fundamentals",
            code: "ML-2024-003",
            lessons: 38,
            students: 18,
            date: "Mar 10, 2024",
            progress: 45,
        },
    ];

    const userData = {
        labels: months,
        datasets: [
            {
                label: "Users",
                data: usersPerMonth,
                borderColor: "var(--yellow)",
                backgroundColor: "rgba(243, 210, 74, 0.2)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "var(--yellow)",
            },
        ],
    };

    const courseData = {
        labels: months,
        datasets: [
            {
                label: "Courses",
                data: coursesPerMonth,
                borderColor: "var(--navy)",
                backgroundColor: "rgba(23, 41, 79, 0.2)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "var(--navy)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top", labels: { color: "var(--text)" } },
            tooltip: { mode: "index", intersect: false },
        },
        scales: {
            x: { ticks: { color: "var(--text)" }, grid: { color: "var(--muted)" } },
            y: { ticks: { color: "var(--text)" }, grid: { color: "var(--muted)" } },
        },
    };

    return (
        <div className="container-fluid">
            <h2 style={{ color: "var(--navy)" }}>Admin Dashboard</h2>

            {/* Small Graphs */}
            <div className="row my-4">
                <div className="col-md-6 mb-3">
                    <div className="card p-3">
                        <h6 style={{ color: "var(--navy)" }}>Users per Month</h6>
                        <Line data={userData} options={options} height={200} />
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card p-3">
                        <h6 style={{ color: "var(--navy)" }}>Courses per Month</h6>
                        <Line data={courseData} options={options} height={200} />
                    </div>
                </div>
            </div>

            {/* ===================== RECENT COURSES ===================== */}
            <h4 style={{ color: "var(--navy)" }}>Recent Courses</h4>

            <div className="row mt-3">
                {recentCourses.map((course, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <div className="card p-3 shadow-sm h-100" style={{ borderRadius: "12px" }}>
                            <div className="d-flex align-items-center mb-3">
                                <FaBook size={45} className="me-3 text-secondary" />
                                <div>
                                    <h5 className="mb-0">{course.title}</h5>
                                    <small className="text-muted">Code: {course.code}</small>
                                </div>
                            </div>

                            <div className="d-flex gap-3 mb-2 flex-wrap">
                                <small><FaClock /> {course.lessons} Lessons</small>
                                <small><FaUsers /> {course.students} Students</small>
                                <small>📅 {course.date}</small>
                            </div>

                            <div className="progress mb-3" style={{ height: "8px" }}>
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${course.progress}%`, background: "var(--yellow)" }}
                                ></div>
                            </div>

                            {/* Buttons */}
                            <div className="d-flex gap-2 mt-auto">
                                <button className="btn btn-light btn-sm">
                                    <FaEdit className="me-1" /> Edit
                                </button>
                                <button className="btn btn-danger btn-sm">
                                    <FaTrash className="me-1" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ===================== RECENT USERS ===================== */}
            <h4 className="mt-5" style={{ color: "var(--navy)" }}>Recent Users</h4>

            <div className="row mt-3">
                {usersPerMonth.slice(-3).map((u, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <div className="card p-3 shadow-sm" style={{ borderRadius: "12px" }}>
                            <div className="d-flex align-items-center mb-3">
                                <FaUsers size={45} className="me-3 text-secondary" />
                                <div>
                                    <h5 className="mb-0">User {index + 1}</h5>
                                    <small className="text-muted">{u} activities</small>
                                </div>
                            </div>

                            <div className="progress mb-2" style={{ height: "8px" }}>
                                <div
                                    className="progress-bar"
                                    style={{ width: `${u * 3}%`, background: "var(--navy)" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
