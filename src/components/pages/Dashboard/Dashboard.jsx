import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaRobot } from 'react-icons/fa';
import DashboardNavbar from './DashboardNavbar';
import CourseCard from './CourseCard';
import AddCourseModal from './AddCourseModal';
import { getCurrentUser, generateCourseId, getCourseColorByIndex } from '../Utils/idGenerator';
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [aiInput, setAiInput] = useState('');

    useEffect(() => {
        // Check if user is logged in
        const currentUser = getCurrentUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }
        setUser(currentUser);

        // Load user's courses from localStorage
        const savedCourses = localStorage.getItem(`wizlearn_courses_${currentUser.userId}`);
        if (savedCourses) {
            setCourses(JSON.parse(savedCourses));
        }
    }, [navigate]);

    const saveCourses = (updatedCourses) => {
        if (user) {
            localStorage.setItem(`wizlearn_courses_${user.userId}`, JSON.stringify(updatedCourses));
            setCourses(updatedCourses);
        }
    };

    const handleAddCourse = (formData) => {
        if (editingCourse) {
            // Update existing course
            const updatedCourses = courses.map(course =>
                course.id === editingCourse.id
                    ? { ...course, title: formData.title, description: formData.description }
                    : course
            );
            saveCourses(updatedCourses);
            setEditingCourse(null);
        } else {
            // Create new course
            const newCourse = {
                id: Date.now(),
                courseId: generateCourseId(),
                title: formData.title,
                description: formData.description,
                // Color will be assigned based on index when rendering
                createdAt: new Date().toLocaleDateString(),
                createdBy: user.userId
            };
            saveCourses([...courses, newCourse]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteCourse = (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            const updatedCourses = courses.filter(course => course.id !== courseId);
            saveCourses(updatedCourses);
        }
    };

    const handleEditCourse = (course) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleFindCourse = () => {
        const courseId = prompt('Enter Course ID to join:');
        if (courseId) {
            alert(`Finding course: ${courseId}\n(This feature will be implemented with backend)`);
        }
    };

    const handleAddFriend = () => {
        const friendId = prompt('Enter Friend\'s User ID:');
        if (friendId) {
            alert(`Sending friend request to: ${friendId}\n(This feature will be implemented with backend)`);
        }
    };

    const handleAiSubmit = (e) => {
        e.preventDefault();
        if (aiInput.trim()) {
            alert(`AI Query: "${aiInput}"\n\n(OpenAI API integration coming soon!)`);
            setAiInput('');
        }
    };

    return (
        <div className="dashboard-container">
            <DashboardNavbar
                onFindCourse={handleFindCourse}
                onAddFriend={handleAddFriend}
            />

            <main className="dashboard-main">
                {/* AI Assistance Section */}
                <div className="ai-assistance-section">
                    <form onSubmit={handleAiSubmit} className="ai-input-container">
                        <FaRobot className="ai-icon" />
                        <input
                            type="text"
                            className="ai-input"
                            placeholder="Ask AI for assistance..."
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                        />
                    </form>
                </div>

                {/* Welcome Section */}
                <div className="dashboard-welcome">
                    <h1>Welcome back, {user?.username}! 👋</h1>
                    <p className="user-id-display">Your User ID: <span className="user-id-badge">{user?.userId}</span></p>
                </div>

                {/* Courses Section */}
                <div className="courses-section">
                    <div className="section-header">
                        <h2>My Courses</h2>
                        <p>{courses.length} {courses.length === 1 ? 'course' : 'courses'}</p>
                    </div>

                    {courses.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📚</div>
                            <h3>No courses yet</h3>
                            <p>Click the + button to create your first course!</p>
                        </div>
                    ) : (
                        <div className="courses-grid">
                            {courses.map((course, index) => (
                                <CourseCard
                                    key={course.id}
                                    course={{ ...course, color: getCourseColorByIndex(index) }}
                                    onDelete={handleDeleteCourse}
                                    onEdit={handleEditCourse}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Floating Add Button */}
                <button
                    className="floating-add-btn"
                    onClick={() => {
                        setEditingCourse(null);
                        setIsModalOpen(true);
                    }}
                    title="Create new course"
                >
                    <FaPlus />
                </button>

                {/* Add Course Modal */}
                <AddCourseModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingCourse(null);
                    }}
                    onSubmit={handleAddCourse}
                    editCourse={editingCourse}
                />
            </main>
        </div>
    );
};

export default Dashboard;
