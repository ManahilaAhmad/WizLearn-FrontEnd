import React, { useState } from 'react';
import { FaSearch, FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ChatPage = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'Ali Khan', lastMessage: 'Hey, how are you?', online: true },
    { id: 2, name: 'Sara Ahmed', lastMessage: 'Check this out!', online: false },
    { id: 3, name: 'Zain Malik', lastMessage: 'I will join soon', online: true },
    { id: 4, name: 'Ayesha Tariq', lastMessage: 'Thanks!', online: false },
  ]);

  const [activeFriend, setActiveFriend] = useState({
    id: 1,
    name: 'Ali Khan',
    lastMessage: 'Hey, how are you?',
    online: true
  });

  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hello! How are you?' },
    { id: 2, sender: 'me', text: 'I am good, thanks!' },
    { id: 3, sender: 'them', text: 'Want to join the course?' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showManage, setShowManage] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: messages.length + 1, sender: 'me', text: newMessage }]);
    setNewMessage('');
  };

  const removeFriend = (id) => {
    const updated = friends.filter((f) => f.id !== id);
    setFriends(updated);

    if (activeFriend.id === id) {
      setActiveFriend(updated[0] || null);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h5>Chats</h5>
          <div className="input-group">
            <span className="input-group-text bg-white"><FaSearch /></span>
            <input type="text" className="form-control" placeholder="Search friends..." />
          </div>
        </div>

        <ul className="friend-list">
          {friends.map(friend => (
            <li
              key={friend.id}
              className={`friend-item ${activeFriend && activeFriend.id === friend.id ? 'active' : ''}`}
              onClick={() => setActiveFriend(friend)}
            >
              <FaUserCircle className="me-2" size={30} />
              <div className="friend-info">
                <div className="friend-name">{friend.name}</div>
                <small className="friend-last">{friend.lastMessage}</small>
              </div>
              <span className={`status-dot ${friend.online ? 'online' : 'offline'}`}></span>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <button
            className="btn btn-warning w-100 mb-2"
            onClick={() => setShowManage(!showManage)}
          >
            Manage Friends
          </button>

          {showManage && (
            <div className="manage-panel mt-2 p-2">
              <h6 className="text-center mb-2">Remove Friends</h6>

              {friends.length === 0 && <p className="text-center">No friends left.</p>}

              {friends.map(friend => (
                <div
                  key={friend.id}
                  className="d-flex align-items-center justify-content-between mb-2 p-2 border rounded"
                >
                  <div className="d-flex align-items-center">
                    <FaUserCircle size={25} className="me-2" />
                    {friend.name}
                  </div>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFriend(friend.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <Link to="/profile" className="btn btn-secondary w-100">
            Back to Profile
          </Link>
        </div>
      </div>

      <div className="chat-main">
        {activeFriend ? (
          <>
            <div className="chat-header">
              <FaUserCircle size={32} className="me-2" />
              <div>
                <h6 className="mb-0">{activeFriend.name}</h6>
                <small className="text-muted">{activeFriend.online ? 'Online' : 'Offline'}</small>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form className="chat-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit"><FaPaperPlane /></button>
            </form>
          </>
        ) : (
          <div className="no-friend-selected">
            <h4 className="text-center mt-5">No friends available.</h4>
          </div>
        )}
      </div>

      <style>{`
        :root {
          --primary: #1D2A50;
          --secondary: #F0D459;
          --background: #D9D9D9;
          --chat-bg: #f8f9fa;
          --friend-active-bg: #1D2A50;
          --friend-active-color: white;
        }
        * { box-sizing: border-box; }
        .chat-container {
          display: flex;
          height: 100vh;
          font-family: 'Inter', sans-serif;
          background-color: var(--background);
        }
        .chat-sidebar {
          width: 280px;
          background: white;
          border-right: 1px solid #ccc;
          display: flex;
          flex-direction: column;
        }
        .sidebar-header {
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }
        .friend-list {
          flex-grow: 1;
          overflow-y: auto;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .friend-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        .friend-item:hover {
          background: rgba(29, 42, 80, 0.05);
        }
        .friend-item.active {
          background: var(--friend-active-bg);
          color: var(--friend-active-color);
        }
        .friend-item.active small {
          color: #e0e0e0;
        }
        .friend-info { flex-grow: 1; }
        .friend-name { font-weight: bold; }
        .friend-last { font-size: 0.8rem; color: #718096; }
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-left: 0.5rem;
        }
        .status-dot.online { background: #38a169; }
        .status-dot.offline { background: #718096; }
        .sidebar-footer { padding: 1rem; border-top: 1px solid #eee; }
        .chat-main { flex-grow: 1; display: flex; flex-direction: column; }
        .chat-header { padding: 1rem; border-bottom: 1px solid #eee; display: flex; align-items: center; background: white; }
        .chat-messages {
          flex-grow: 1;
          padding: 1rem;
          overflow-y: auto;
          background: var(--chat-bg);
        }
        .message {
          max-width: 60%;
          padding: 0.5rem 1rem;
          border-radius: 15px;
          margin-bottom: 0.5rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          animation: fadeIn 0.3s ease;
        }
        .message.sent {
          margin-left: auto;
          background: var(--primary);
          color: white;
        }
        .message.received {
          background: white;
          color: var(--primary);
        }
        .chat-input {
          display: flex;
          padding: 0.75rem 1rem;
          border-top: 1px solid #eee;
          background: white;
        }
        .chat-input input {
          flex-grow: 1;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid #ccc;
          margin-right: 0.5rem;
        }
        .chat-input button {
          border: none;
          background: var(--secondary);
          color: var(--primary);
          padding: 0.5rem 1rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .chat-input button:hover { transform: scale(1.1); }
        .manage-panel {
          background: #fff8d6;
          border: 1px solid #e6c85a;
          border-radius: 8px;
          max-height: 220px;
          overflow-y: auto;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media(max-width: 768px) {
          .chat-sidebar { width: 200px; }
        }
      `}</style>
    </div>
  );
};

export default ChatPage;
