import React, { useState } from 'react';
import { FaBrain, FaBook, FaEdit, FaKey, FaSignOutAlt, FaCode, FaEye, FaTrash, FaUserCircle, FaChartLine, FaClock, FaPlus, FaUsers } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('created');
  const [showModal, setShowModal] = useState(null);
  const [formData, setFormData] = useState({
    username: 'JohnDoe',
    userId: 'WL-2024-1234',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    courseCode: ''
  });

  // Sample data - Replace with actual data from your backend
  const [createdCourses] = useState([
    {
      id: 1,
      title: 'Data Structures & Algorithms',
      code: 'DS-2024-001',
      lessons: 42,
      students: 15,
      progress: 85,
      createdDate: 'Jan 15, 2024'
    },
    {
      id: 2,
      title: 'Web Development Bootcamp',
      code: 'WD-2024-002',
      lessons: 56,
      students: 23,
      progress: 60,
      createdDate: 'Feb 20, 2024'
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      code: 'ML-2024-003',
      lessons: 38,
      students: 18,
      progress: 45,
      createdDate: 'Mar 10, 2024'
    }
  ]);

  const [enrolledCourses] = useState([
    {
      id: 4,
      title: 'Advanced Python Programming',
      code: 'PY-2024-101',
      lessons: 30,
      progress: 70,
      instructor: 'Dr. Smith',
      enrolledDate: 'Jan 20, 2024'
    },
    {
      id: 5,
      title: 'Database Management Systems',
      code: 'DB-2024-102',
      lessons: 25,
      progress: 55,
      instructor: 'Prof. Johnson',
      enrolledDate: 'Feb 5, 2024'
    }
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Add password change logic here
    console.log('Password change submitted');
    alert('Password changed successfully!');
    setShowModal(null);
    setFormData({...formData, currentPassword: '', newPassword: '', confirmPassword: ''});
  };

  const handleEnrollCourse = (e) => {
    e.preventDefault();
    // Add course enrollment logic here
    console.log('Enrolling in course:', formData.courseCode);
    alert(`Successfully enrolled in course: ${formData.courseCode}`);
    setShowModal(null);
    setFormData({...formData, courseCode: ''});
  };

  const Modal = ({ title, children }) => (
    <div className="modal-overlay" onClick={() => setShowModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="btn-close" onClick={() => setShowModal(null)}>×</button>
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <FaUserCircle />
          </div>
          <div className="profile-details">
            <h1>
              {formData.username}
              <MdVerified style={{ color: '#F0D459', fontSize: '2rem' }} />
            </h1>
            <p>User ID: {formData.userId}</p>
            <p>Member since January 2024</p>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{createdCourses.length}</span>
                <span className="stat-label">Courses Created</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{enrolledCourses.length}</span>
                <span className="stat-label">Courses Enrolled</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">156</span>
                <span className="stat-label">Hours Learned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="settings-section">
        <h2 className="section-title">
          <FaEdit />
          Account Settings
        </h2>
        <div className="settings-grid">
          <div className="setting-card" onClick={() => setShowModal('password')}>
            <div className="setting-icon">
              <FaKey />
            </div>
            <h3>Change Password</h3>
            <p>Update your password to keep your account secure</p>
          </div>

          <div className="setting-card" onClick={() => setShowModal('enroll')}>
            <div className="setting-icon">
              <FaCode />
            </div>
            <h3>Join Course</h3>
            <p>Enter a course code to enroll in view-only mode</p>
          </div>

          <div className="setting-card" onClick={() => alert('Logout functionality')}>
            <div className="setting-icon">
              <FaSignOutAlt />
            </div>
            <h3>Logout</h3>
            <p>Sign out from your account</p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="courses-section">
        <div className="courses-header">
          <h2 className="section-title">
            <FaBook />
            My Courses
          </h2>
          <div className="courses-tabs">
            <button 
              className={`tab-button ${activeTab === 'created' ? 'active' : ''}`}
              onClick={() => setActiveTab('created')}
            >
              Created ({createdCourses.length})
            </button>
            <button 
              className={`tab-button ${activeTab === 'enrolled' ? 'active' : ''}`}
              onClick={() => setActiveTab('enrolled')}
            >
              Enrolled ({enrolledCourses.length})
            </button>
          </div>
          <button className="btn-add-course" onClick={() => alert('Navigate to Create Course page')}>
            <FaPlus />
            Create New Course
          </button>
        </div>

        {/* Created Courses */}
        {activeTab === 'created' && (
          <div className="courses-grid">
            {createdCourses.length > 0 ? (
              createdCourses.map(course => (
                <div key={course.id} className="course-card">
                  <div className="course-header">
                    <div className="course-icon-wrapper">
                      <FaBook />
                    </div>
                    <span className="course-badge badge-created">
                      Created
                    </span>
                  </div>
                  
                  <h3 className="course-title">{course.title}</h3>
                  <span className="course-code">Code: {course.code}</span>
                  
                  <div className="course-meta">
                    <div className="meta-item">
                      <FaBook />
                      {course.lessons} Lessons
                    </div>
                    <div className="meta-item">
                      <FaUsers />
                      {course.students} Students
                    </div>
                    <div className="meta-item">
                      <FaClock />
                      {course.createdDate}
                    </div>
                  </div>

                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="course-actions">
                    <button className="btn-action btn-primary" onClick={() => alert('Edit course')}>
                      <FaEdit />
                      Edit
                    </button>
                    <button className="btn-action btn-secondary" onClick={() => alert('View analytics')}>
                      <FaChartLine />
                      Analytics
                    </button>
                    <button className="btn-action btn-danger" onClick={() => confirm('Delete this course?')}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FaBook />
                </div>
                <h3>No courses created yet</h3>
                <p>Create your first course to get started!</p>
              </div>
            )}
          </div>
        )}

        {/* Enrolled Courses */}
        {activeTab === 'enrolled' && (
          <div className="courses-grid">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map(course => (
                <div key={course.id} className="course-card enrolled">
                  <div className="course-header">
                    <div className="course-icon-wrapper">
                      <FaBook />
                    </div>
                    <span className="course-badge badge-enrolled">
                      <FaEye />
                      View Only
                    </span>
                  </div>
                  
                  <h3 className="course-title">{course.title}</h3>
                  <span className="course-code">Code: {course.code}</span>
                  
                  <div className="course-meta">
                    <div className="meta-item">
                      <FaBook />
                      {course.lessons} Lessons
                    </div>
                    <div className="meta-item">
                      <FaUserCircle />
                      {course.instructor}
                    </div>
                    <div className="meta-item">
                      <FaClock />
                      {course.enrolledDate}
                    </div>
                  </div>

                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Your Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="course-actions">
                    <button className="btn-action btn-primary" onClick={() => alert('View course content')}>
                      <FaEye />
                      View Course
                    </button>
                    <button className="btn-action btn-danger" onClick={() => confirm('Leave this course?')}>
                      <FaTrash />
                      Leave
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FaBook />
                </div>
                <h3>No enrolled courses yet</h3>
                <p>Use a course code to join a course!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal === 'password' && (
        <Modal title="Change Password">
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                className="form-input"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="form-input"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Update Password
            </button>
          </form>
        </Modal>
      )}

      {showModal === 'enroll' && (
        <Modal title="Join Course with Code">
          <form onSubmit={handleEnrollCourse}>
            <div className="form-group">
              <label className="form-label">Course Code</label>
              <input
                type="text"
                name="courseCode"
                className="form-input"
                value={formData.courseCode}
                onChange={handleInputChange}
                placeholder="e.g., DS-2024-001"
                required
              />
            </div>
            <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Enter the course code provided by your instructor. You'll have view-only access to the course materials.
            </p>
            <button type="submit" className="btn-submit">
              Join Course
            </button>
          </form>
        </Modal>
      )}

      <style>{`
        :root {
          --primary: #1D2A50;
          --secondary: #F0D459;
          --background: #D9D9D9;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: var(--background);
        }

        .profile-container {
          min-height: 100vh;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .profile-header {
          background: linear-gradient(135deg, var(--primary) 0%, #2a3f6e 100%);
          border-radius: 1.5rem;
          padding: 3rem;
          margin-bottom: 2rem;
          color: white;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          animation: fadeInDown 0.6s ease-out;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          color: var(--primary);
          box-shadow: 0 8px 25px rgba(240, 212, 89, 0.4);
          transition: transform 0.3s ease;
        }

        .profile-avatar:hover {
          transform: scale(1.05) rotate(5deg);
        }

        .profile-details h1 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .profile-details p {
          font-size: 1.1rem;
          color: #cbd5e0;
          margin-bottom: 0.25rem;
        }

        .profile-stats {
          display: flex;
          gap: 2rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: var(--secondary);
          display: block;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #a0aec0;
        }

        .settings-section {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: bold;
          color: var(--primary);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .setting-card {
          background: var(--background);
          padding: 1.5rem;
          border-radius: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .setting-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .setting-icon {
          width: 50px;
          height: 50px;
          background: var(--secondary);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          font-size: 1.5rem;
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }

        .setting-card:hover .setting-icon {
          transform: rotate(360deg);
        }

        .setting-card h3 {
          color: var(--primary);
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .setting-card p {
          color: #4a5568;
          font-size: 0.95rem;
        }

        .courses-section {
          animation: fadeInUp 0.6s ease-out 0.4s both;
        }

        .courses-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .courses-tabs {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .tab-button {
          padding: 0.75rem 1.5rem;
          background: white;
          border: 2px solid var(--primary);
          color: var(--primary);
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(29, 42, 80, 0.2);
        }

        .tab-button.active {
          background: var(--primary);
          color: white;
        }

        .btn-add-course {
          padding: 0.75rem 1.5rem;
          background: var(--secondary);
          border: none;
          color: var(--primary);
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-add-course:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(240, 212, 89, 0.4);
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .course-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .course-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--secondary);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .course-card:hover::before {
          transform: scaleX(1);
        }

        .course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .course-card.enrolled {
          border-left: 4px solid #4299e1;
        }

        .course-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }

        .course-icon-wrapper {
          width: 60px;
          height: 60px;
          background: var(--background);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          font-size: 1.8rem;
        }

        .course-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .badge-created {
          background: rgba(240, 212, 89, 0.2);
          color: var(--primary);
        }

        .badge-enrolled {
          background: rgba(66, 153, 225, 0.2);
          color: #2c5282;
        }

        .course-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .course-code {
          font-size: 0.85rem;
          color: #718096;
          font-family: monospace;
          background: var(--background);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .course-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4a5568;
          font-size: 0.9rem;
        }

        .progress-section {
          margin-bottom: 1rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: #4a5568;
        }

        .progress-bar {
          height: 8px;
          background: var(--background);
          border-radius: 1rem;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--secondary);
          border-radius: 1rem;
          transition: width 0.5s ease;
        }

        .course-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .btn-action {
          flex: 1;
          padding: 0.65rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-primary:hover {
          background: #2a3f6e;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: var(--background);
          color: var(--primary);
        }

        .btn-secondary:hover {
          background: #c0c0c0;
          transform: translateY(-2px);
        }

        .btn-danger {
          background: #fc8181;
          color: white;
        }

        .btn-danger:hover {
          background: #f56565;
          transform: translateY(-2px);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 1.5rem;
          padding: 2rem;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: fadeInUp 0.3s ease;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-size: 1.75rem;
          font-weight: bold;
          color: var(--primary);
        }

        .btn-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #718096;
          transition: color 0.3s ease;
        }

        .btn-close:hover {
          color: var(--primary);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--primary);
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--background);
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--secondary);
          box-shadow: 0 0 0 3px rgba(240, 212, 89, 0.2);
        }

        .btn-submit {
          width: 100%;
          padding: 1rem;
          background: var(--secondary);
          color: var(--primary);
          border: none;
          border-radius: 0.5rem;
          font-weight: bold;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-submit:hover {
          background: #e8c850;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(240, 212, 89, 0.4);
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #718096;
        }

        .empty-state-icon {
          font-size: 4rem;
          color: var(--background);
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .profile-container {
            padding: 1rem;
          }

          .profile-header {
            padding: 2rem;
          }

          .profile-info {
            flex-direction: column;
            text-align: center;
          }

          .profile-details h1 {
            font-size: 2rem;
            justify-content: center;
          }

          .profile-stats {
            justify-content: center;
          }

          .settings-grid {
            grid-template-columns: 1fr;
          }

          .courses-grid {
            grid-template-columns: 1fr;
          }

          .courses-header {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;