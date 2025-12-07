import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEllipsisV, FaTrash, FaEdit, FaEye, FaCopy } from 'react-icons/fa';

const CourseCard = ({ course, onDelete, onEdit }) => {
    const navigate = useNavigate();
    const { id, title, description, color, createdAt, courseId } = course;

    const handleCopyCourseId = (e) => {
        e.stopPropagation(); // Prevent card click
        navigator.clipboard.writeText(courseId);
        alert(`Course ID "${courseId}" copied to clipboard!`);
    };

    const handleCardClick = () => {
        navigate(`/course/${courseId}`);
    };

    const handleEdit = (e) => {
        e.stopPropagation(); // Prevent card click
        onEdit(course);
    };

    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent card click
        onDelete(id);
    };

    return (
        <div className="course-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div
                className="course-card-header"
                style={{
                    background: `linear-gradient(135deg, ${color.from} 0%, ${color.to} 100%)`
                }}
            >
                <h3 className="course-title">{title}</h3>
                <button className="course-menu-btn" onClick={(e) => e.stopPropagation()}>
                    <FaEllipsisV />
                </button>
            </div>

            <div className="course-card-body">
                <p className="course-description">{description}</p>

                <div className="course-meta">
                    <div className="course-id-badge" onClick={handleCopyCourseId} title="Click to copy">
                        <span className="course-id-label">Course ID:</span>
                        <span className="course-id-value">{courseId}</span>
                        <FaCopy className="copy-icon" />
                    </div>
                    <span className="course-date">Created: {createdAt}</span>
                </div>
            </div>

            <div className="course-card-footer" onClick={(e) => e.stopPropagation()}>
                <button className="course-action-btn view-btn" onClick={handleCardClick}>
                    <FaEye />
                    View
                </button>
                <button className="course-action-btn edit-btn" onClick={handleEdit}>
                    <FaEdit />
                    Edit
                </button>
                <button className="course-action-btn delete-btn" onClick={handleDelete}>
                    <FaTrash />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
