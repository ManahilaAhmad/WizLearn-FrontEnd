import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import CourseNavbar from './CourseNavbar';
import MaterialCard from './MaterialCard';
import UploadMaterialModal from './UploadMaterialModal';
import { getCurrentUser, getCourseColorByIndex } from '../Utils/idGenerator';
import './course.css';

const CoursePage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [course, setCourse] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const currentUser = getCurrentUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }
        setUser(currentUser);

        // Load course data
        const savedCourses = localStorage.getItem(`wizlearn_courses_${currentUser.userId}`);
        if (savedCourses) {
            const courses = JSON.parse(savedCourses);
            const foundCourse = courses.find(c => c.courseId === courseId);

            if (foundCourse) {
                // Find the index to get the correct color
                const courseIndex = courses.findIndex(c => c.courseId === courseId);
                setCourse({ ...foundCourse, color: getCourseColorByIndex(courseIndex) });
            } else {
                // Course not found, redirect to dashboard
                navigate('/dashboard');
            }
        } else {
            navigate('/dashboard');
        }

        // Load materials for this course
        const savedMaterials = localStorage.getItem(`wizlearn_materials_${currentUser.userId}_${courseId}`);
        if (savedMaterials) {
            setMaterials(JSON.parse(savedMaterials));
        }
    }, [courseId, navigate]);

    const saveMaterials = (updatedMaterials) => {
        if (user) {
            localStorage.setItem(`wizlearn_materials_${user.userId}_${courseId}`, JSON.stringify(updatedMaterials));
            setMaterials(updatedMaterials);
        }
    };

    const handleUploadMaterial = (formData) => {
        const newMaterial = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            fileData: formData.fileData || null, // Store complete file data
            uploadDate: new Date().toLocaleDateString()
        };
        saveMaterials([...materials, newMaterial]);
        setIsModalOpen(false);
    };

    const handleDeleteMaterial = (materialId) => {
        if (window.confirm('Are you sure you want to delete this material?')) {
            const updatedMaterials = materials.filter(m => m.id !== materialId);
            saveMaterials(updatedMaterials);
        }
    };

    const handleGenerateQuiz = () => {
        alert('Generate Quiz feature coming soon!\n\nThis will use AI to create quizzes based on your course materials.');
    };

    const handleGenerateRoadmap = () => {
        alert('Roadmap feature coming soon!\n\nThis will generate a learning roadmap for your course.');
    };

    if (!course) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="course-page">
            <CourseNavbar
                courseTitle={course.title}
                onGenerateQuiz={handleGenerateQuiz}
                onGenerateRoadmap={handleGenerateRoadmap}
            />

            {/* Course Header */}
            <div
                className="course-header"
                style={{
                    background: `linear-gradient(135deg, ${course.color.from} 0%, ${course.color.to} 100%)`
                }}
            >
                <div className="course-header-content">
                    <h1 className="course-page-title">{course.title}</h1>
                    <p className="course-page-description">{course.description}</p>
                    <div className="course-page-id">
                        <span className="id-label">Course ID:</span>
                        <span className="id-value">{course.courseId}</span>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="course-content">
                <div className="materials-section">
                    <div className="section-header">
                        <h2>Course Materials</h2>
                        <p>{materials.length} {materials.length === 1 ? 'material' : 'materials'}</p>
                    </div>

                    {materials.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📚</div>
                            <h3>No materials yet</h3>
                            <p>Click the + button to upload your first material!</p>
                        </div>
                    ) : (
                        <div className="materials-grid">
                            {materials.map(material => (
                                <MaterialCard
                                    key={material.id}
                                    material={material}
                                    onDelete={handleDeleteMaterial}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Floating Upload Button */}
                <button
                    className="floating-add-btn"
                    onClick={() => setIsModalOpen(true)}
                    title="Upload material"
                >
                    <FaPlus />
                </button>

                {/* Upload Material Modal */}
                <UploadMaterialModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleUploadMaterial}
                />
            </div>
        </div>
    );
};

export default CoursePage;
