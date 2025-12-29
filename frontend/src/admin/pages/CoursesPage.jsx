// pages/CoursesPage.jsx
import React from "react";
import CourseTable from "../components/CourseTable";

export default function CoursesPage() {
  return (
    <div className="container mt-4">
      <h2>Courses</h2>
      <CourseTable />
    </div>
  );
}
