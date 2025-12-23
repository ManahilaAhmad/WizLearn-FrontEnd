return (
  <div className="profile-container">
    <ChatNavbar /> {/* 🔹 Add this line */}

    {/* Profile Header */}
    <div className="profile-header">
      <div className="profile-info">
        ...
      </div>
    </div>

    {/* Settings Section */}
    <div className="settings-section">
      ...
    </div>

    {/* Courses Section */}
    <div className="courses-section">
      ...
    </div>

    {/* Modals */}
    {showModal === 'password' && (
      <Modal title="Change Password">
        ...
      </Modal>
    )}
    {showModal === 'enroll' && (
      <Modal title="Join Course with Code">
        ...
      </Modal>
    )}

    <style>{`
      ...
    `}</style>
  </div>
);
