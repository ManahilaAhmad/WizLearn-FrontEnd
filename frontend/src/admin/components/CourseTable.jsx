// components/CourseTable.jsx
import React from "react";
import { useAdmin } from "../context/AdminContext";

export default function CourseTable() {
  const { courses, deleteCourse } = useAdmin();

  return (
    <table className="table table-striped table-hover mt-3">
      <thead className="table-dark">
        <tr>
          <th>Course ID</th>
          <th>Course Name</th>
          <th>Created By</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {courses.map(course => (
          <tr key={course.id}>
            <td>{course.id}</td>
            <td>{course.title}</td>
            <td>{course.createdBy || "Admin"}</td>

            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteCourse(course.id)}
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
