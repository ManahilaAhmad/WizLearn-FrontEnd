import React, { useState } from 'react';

const ChatWindow = ({ friend }) => {
  const [messages, setMessages] = useState([
    { from: 'me', text: `Hey ${friend.name}! How are you?` },
    { from: friend.name, text: 'I am good, thanks!' },
  ]);

  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { from: 'me', text: input }]);
    setInput('');
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: '#fff'
    }}>
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #ccc',
        fontWeight: 'bold'
      }}>
        Chat with {friend.name}
      </div>
      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.from === 'me' ? 'flex-end' : 'flex-start',
              background: msg.from === 'me' ? '#d0e6ff' : '#f1f1f1',
              padding: '0.5rem 1rem',
              borderRadius: '1rem',
              maxWidth: '60%'
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        style={{
          display: 'flex',
          padding: '1rem',
          borderTop: '1px solid #ccc',
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '1rem',
            border: '1px solid #ccc',
            marginRight: '0.5rem'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '1rem',
            background: '#1D2A50',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
