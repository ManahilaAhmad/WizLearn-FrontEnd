import React, { useState } from 'react';
import { FaSearch, FaPaperPlane, FaUserCircle, FaArrowLeft } from 'react-icons/fa';
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
                    <div className="d-flex align-items-center mb-2">
                        <Link to="/dashboard" className="btn btn-sm btn-light me-2"><FaArrowLeft /></Link>
                        <h5 className="mb-0">Chats</h5>
                    </div>
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
          --background: #F7FAFC;
          --chat-bg: #E2E8F0;
          --friend-active-bg: rgba(240, 212, 89, 0.2);
          --friend-active-color: #1D2A50;
        }
        
        .chat-container {
          display: flex;
          height: 100vh;
          font-family: 'Inter', sans-serif;
          background-color: var(--background);
        }
        .chat-sidebar {
          width: 320px;
          background: white;
          border-right: 1px solid #E2E8F0;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 5px rgba(0,0,0,0.02);
          z-index: 10;
        }
        .sidebar-header {
            padding: 1.5rem;
            background: #1D2A50;
            color: white;
        }
        .sidebar-header h5 {
            color: white;
            font-weight: 600;
        }
        .friend-list {
          flex-grow: 1;
          overflow-y: auto;
          list-style: none;
          padding: 1rem 0;
          margin: 0;
        }
        .friend-item {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 4px solid transparent;
        }
        .friend-item:hover {
          background: #F7FAFC;
        }
        .friend-item.active {
          background: #F0F4FF;
          border-left-color: #F0D459;
        }
        .friend-item.active .friend-name {
            color: #1D2A50; 
        }
        .friend-info { flex-grow: 1; margin-left: 12px; }
        .friend-name { font-weight: 600; color: #2D3748; }
        .friend-last { font-size: 0.85rem; color: #718096; display: block; margin-top: 2px;}
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-left: 0.5rem;
          box-shadow: 0 0 0 2px white;
        }
        .status-dot.online { background: #48BB78; }
        .status-dot.offline { background: #CBD5E0; }
        .sidebar-footer { padding: 1rem; border-top: 1px solid #E2E8F0; background: #F7FAFC;}
        .chat-main { flex-grow: 1; display: flex; flex-direction: column; background: #EDF2F7; }
        .chat-header { 
            padding: 1rem 2rem; 
            border-bottom: 1px solid #E2E8F0; 
            display: flex; 
            align-items: center; 
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .chat-messages {
          flex-grow: 1;
          padding: 2rem;
          overflow-y: auto;
          background-image: radial-gradient(#E2E8F0 1px, transparent 1px);
          background-size: 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .message {
          max-width: 65%;
          padding: 0.75rem 1.25rem;
          border-radius: 1rem;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          line-height: 1.5;
          position: relative;
        }
        .message.sent {
          align-self: flex-end;
          background: #1D2A50;
          color: white;
          border-bottom-right-radius: 4px;
        }
        .message.received {
            align-self: flex-start;
          background: white;
          color: #2D3748;
          border-bottom-left-radius: 4px;
        }
        .chat-input {
          display: flex;
          padding: 1.5rem;
          background: white;
          border-top: 1px solid #E2E8F0;
        }
        .chat-input input {
          flex-grow: 1;
          padding: 1rem 1.5rem;
          border-radius: 3rem;
          border: 2px solid #E2E8F0;
          margin-right: 1rem;
          outline: none;
          background: #F7FAFC;
          transition: border-color 0.2s;
        }
        .chat-input input:focus {
            border-color: #F0D459;
            background: white;
        }
        .chat-input button {
          border: none;
          background: #F0D459;
          color: #1D2A50;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(240, 212, 89, 0.3);
        }
        .chat-input button:hover { 
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(240, 212, 89, 0.4);
        }
        .manage-panel {
          background: white;
          border: 1px solid #F0D459;
          border-radius: 0.5rem;
          max-height: 220px;
          overflow-y: auto;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media(max-width: 768px) {
          .chat-sidebar { width: 80px; }
          .friend-info, .sidebar-header h5, .input-group, .sidebar-footer button { display: none; }
          .sidebar-header { justify-content: center; padding: 1rem;}
          .friend-item { justify-content: center; padding: 1rem; }
        }
      `}</style>
        </div>
    );
};

export default ChatPage;
