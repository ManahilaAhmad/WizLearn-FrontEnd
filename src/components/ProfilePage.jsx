import React, { useState } from 'react';
import { 
  FaBrain, FaBook, FaEdit, FaKey, FaSignOutAlt, FaCode, FaEye, FaTrash, 
  FaUserCircle, FaChartLine, FaClock, FaPlus, FaUsers, FaComments 
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
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

  const [createdCourses] = useState([
    { id: 1, title: 'Data Structures & Algorithms', code: 'DS-2024-001', lessons: 42, students: 15, progress: 85, createdDate: 'Jan 15, 2024' },
    { id: 2, title: 'Web Development Bootcamp', code: 'WD-2024-002', lessons: 56, students: 23, progress: 60, createdDate: 'Feb 20, 2024' },
    { id: 3, title: 'Machine Learning Fundamentals', code: 'ML-2024-003', lessons: 38, students: 18, progress: 45, createdDate: 'Mar 10, 2024' }
  ]);

  const [enrolledCourses] = useState([
    { id: 4, title: 'Advanced Python Programming', code: 'PY-2024-101', lessons: 30, progress: 70, instructor: 'Dr. Smith', enrolledDate: 'Jan 20, 2024' },
    { id: 5, title: 'Database Management Systems', code: 'DB-2024-102', lessons: 25, progress: 55, instructor: 'Prof. Johnson', enrolledDate: 'Feb 5, 2024' }
  ]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setShowModal(null);
    setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEnrollCourse = (e) => {
    e.preventDefault();
    alert(`Successfully enrolled in course: ${formData.courseCode}`);
    setShowModal(null);
    setFormData({ ...formData, courseCode: '' });
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
          <div className="profile-avatar"><FaUserCircle /></div>
          <div className="profile-details">
            <h1>{formData.username} <MdVerified style={{ color: '#F0D459', fontSize: '2rem' }} /></h1>
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
        <h2 className="section-title"><FaEdit /> Account Settings</h2>
        <div className="settings-grid">
          <div className="setting-card" onClick={() => setShowModal('password')}>
            <div className="setting-icon"><FaKey /></div>
            <h3>Change Password</h3>
            <p>Update your password to keep your account secure</p>
          </div>
          <div className="setting-card" onClick={() => setShowModal('enroll')}>
            <div className="setting-icon"><FaCode /></div>
            <h3>Join Course</h3>
            <p>Enter a course code to enroll in view-only mode</p>
          </div>
          <div className="setting-card" onClick={() => alert('Logout functionality')}>
            <div className="setting-icon"><FaSignOutAlt /></div>
            <h3>Logout</h3>
            <p>Sign out from your account</p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="courses-section">
        <div className="courses-header">
          <h2 className="section-title"><FaBook /> My Courses</h2>
          <div className="courses-tabs">
            <button className={`tab-button ${activeTab === 'created' ? 'active' : ''}`} onClick={() => setActiveTab('created')}>
              Created ({createdCourses.length})
            </button>
            <button className={`tab-button ${activeTab === 'enrolled' ? 'active' : ''}`} onClick={() => setActiveTab('enrolled')}>
              Enrolled ({enrolledCourses.length})
            </button>
          </div>
          <button className="btn-add-course" onClick={() => alert('Navigate to Create Course page')}>
            <FaPlus /> Create New Course
          </button>
        </div>

        {activeTab === 'created' && (
          <div className="courses-grid">
            {createdCourses.length > 0 ? createdCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <div className="course-icon-wrapper"><FaBook /></div>
                  <span className="course-badge badge-created">Created</span>
                </div>
                <h3 className="course-title">{course.title}</h3>
                <span className="course-code">Code: {course.code}</span>
                <div className="course-meta">
                  <div className="meta-item"><FaBook />{course.lessons} Lessons</div>
                  <div className="meta-item"><FaUsers />{course.students} Students</div>
                  <div className="meta-item"><FaClock />{course.createdDate}</div>
                </div>
                <div className="progress-section">
                  <div className="progress-header"><span>Course Progress</span><span>{course.progress}%</span></div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${course.progress}%` }}></div></div>
                </div>
                <div className="course-actions">
                  <button className="btn-action btn-primary" onClick={() => alert('Edit course')}><FaEdit /> Edit</button>
                  <button className="btn-action btn-secondary" onClick={() => alert('View analytics')}><FaChartLine /> Analytics</button>
                  <button className="btn-action btn-danger" onClick={() => confirm('Delete this course?')}><FaTrash /> Delete</button>
                </div>
              </div>
            )) : (
              <div className="empty-state"><div className="empty-state-icon"><FaBook /></div><h3>No courses created yet</h3><p>Create your first course to get started!</p></div>
            )}
          </div>
        )}

        {activeTab === 'enrolled' && (
          <div className="courses-grid">
            {enrolledCourses.length > 0 ? enrolledCourses.map(course => (
              <div key={course.id} className="course-card enrolled">
                <div className="course-header"><div className="course-icon-wrapper"><FaBook /></div><span className="course-badge badge-enrolled"><FaEye /> View Only</span></div>
                <h3 className="course-title">{course.title}</h3>
                <span className="course-code">Code: {course.code}</span>
                <div className="course-meta">
                  <div className="meta-item"><FaBook />{course.lessons} Lessons</div>
                  <div className="meta-item"><FaUserCircle />{course.instructor}</div>
                  <div className="meta-item"><FaClock />{course.enrolledDate}</div>
                </div>
                <div className="progress-section">
                  <div className="progress-header"><span>Your Progress</span><span>{course.progress}%</span></div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${course.progress}%` }}></div></div>
                </div>
                <div className="course-actions">
                  <button className="btn-action btn-primary" onClick={() => alert('View course content')}><FaEye /> View Course</button>
                  <button className="btn-action btn-danger" onClick={() => confirm('Leave this course?')}><FaTrash /> Leave</button>
                </div>
              </div>
            )) : (
              <div className="empty-state"><div className="empty-state-icon"><FaBook /></div><h3>No enrolled courses yet</h3><p>Use a course code to join a course!</p></div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal === 'password' && (
        <Modal title="Change Password">
          <form onSubmit={handlePasswordChange}>
            <div className="form-group"><label className="form-label">Current Password</label><input type="password" name="currentPassword" className="form-input" value={formData.currentPassword} onChange={handleInputChange} required /></div>
            <div className="form-group"><label className="form-label">New Password</label><input type="password" name="newPassword" className="form-input" value={formData.newPassword} onChange={handleInputChange} required /></div>
            <div className="form-group"><label className="form-label">Confirm New Password</label><input type="password" name="confirmPassword" className="form-input" value={formData.confirmPassword} onChange={handleInputChange} required /></div>
            <button type="submit" className="btn-submit">Update Password</button>
          </form>
        </Modal>
      )}

      {showModal === 'enroll' && (
        <Modal title="Join Course with Code">
          <form onSubmit={handleEnrollCourse}>
            <div className="form-group"><label className="form-label">Course Code</label><input type="text" name="courseCode" className="form-input" value={formData.courseCode} onChange={handleInputChange} required /></div>
            <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Enter the course code provided by your instructor. You'll have view-only access to the course materials.</p>
            <button type="submit" className="btn-submit">Join Course</button>
          </form>
        </Modal>
      )}

      {/* Floating Chat Button */}
      <button className="btn-chat" onClick={() => navigate('/chat')}>
        <FaComments /> Chat
      </button>
      {/* FULL CSS — NOT REMOVED */}
      <style>{`
      .btn-chat {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 0.8rem 1rem;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 1000;
        }
        .btn-chat:hover { background-color: #4338ca; transform: translateY(-2px); }
        /* ALL YOUR CSS EXACTLY AS IT WAS */
        :root { --primary: #1D2A50; --secondary: #F0D459; --background: #D9D9D9; }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Inter', sans-serif; background-color: var(--background); }
        .profile-container { min-height:100vh; padding:2rem; max-width:1400px; margin:0 auto; }
        .profile-header { background: linear-gradient(135deg, var(--primary) 0%, #2a3f6e 100%); border-radius:1.5rem; padding:3rem; margin-bottom:2rem; color:white; box-shadow:0 10px 40px rgba(0,0,0,0.2); }
        .profile-info { display:flex; align-items:center; gap:2rem; flex-wrap:wrap; }
        .profile-avatar { width:120px; height:120px; border-radius:50%; background:var(--secondary); display:flex; align-items:center; justify-content:center; font-size:4rem; color:var(--primary); }
        .profile-details h1 { font-size:2.5rem; font-weight:bold; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem; }
        .profile-details p { font-size:1.1rem; color:#cbd5e0; margin-bottom:0.25rem; }
        .profile-stats { display:flex; gap:2rem; flex-wrap:wrap; }
        .stat-item { text-align:center; }
        .stat-number { font-size:2rem; font-weight:bold; color:var(--secondary); display:block; }
        .stat-label { font-size:0.9rem; color:#a0aec0; }
        .settings-section { background:white; border-radius:1.5rem; padding:2rem; }
        .section-title { font-size:1.75rem; font-weight:bold; color:var(--primary); margin-bottom:1.5rem; display:flex; align-items:center; gap:0.5rem; }
        .settings-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:1.5rem; }
        .setting-card { background:var(--background); padding:1.5rem; border-radius:1rem; cursor:pointer; transition:.3s; }
        .setting-card:hover { transform:translateY(-5px); }
        .setting-icon { width:50px; height:50px; background:var(--secondary); border-radius:.75rem; display:flex; align-items:center; justify-content:center; font-size:1.5rem; color:var(--primary); }
        .courses-section {}
        .courses-header { display:flex; justify-content:flex-start; margin-bottom:1rem; }
        .tab-button { padding:10px 20px; border:2px solid var(--primary); border-radius:10px; background:white; }
        .tab-button.active { background:var(--primary); color:white; }
        .courses-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:1.5rem; }
        .course-card { background:white; padding:1.5rem; border-radius:1rem; box-shadow:0 4px 15px rgba(0,0,0,0.1); }
        .course-card.enrolled { border-left:4px solid #4299e1; }
        .course-header { display:flex; gap:1rem; margin-bottom:1rem; }
        .course-icon-wrapper { width:60px; height:60px; background:var(--background); border-radius:.75rem; font-size:1.8rem; display:flex; align-items:center; justify-content:center; }
        .course-badge { padding:5px 10px; border-radius:20px; font-size:.8rem; font-weight:bold; }
        .badge-created { background:rgba(240,212,89,0.2); color:var(--secondary); }
        .badge-enrolled { background:rgba(66,153,225,0.2); color:#4299e1; }
        .course-meta { display:flex; gap:1rem; flex-wrap:wrap; color:#4a5568; }
        .meta-item { display:flex; align-items:center; gap:5px; }
        .progress-bar { height:6px; background:#e2e8f0; border-radius:3px; }
        .progress-fill { height:100%; background:var(--secondary); border-radius:3px; }
        .modal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; }
        .modal-content { background:white; padding:2rem; border-radius:1rem; max-width:500px; width:100%; }
        .btn-submit { background:var(--primary); color:white; padding:.75rem 1.5rem; border:none; border-radius:.75rem; margin-top:1rem; }
        .btn-go-chat { background:#4299e1; color:white; padding:.75rem 1.5rem; border-radius:.75rem; margin-top:1rem; display:flex; align-items:center; gap:.5rem; }
      `}</style>
    </div>
  );
};

export default ProfilePage;
