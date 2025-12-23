import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const FriendList = ({ friends, selectedFriend, onSelect }) => {
  const [search, setSearch] = useState('');

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      width: '300px',
      borderRight: '1px solid #ccc',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      background: '#f7f7f7'
    }}>
      <div style={{ marginBottom: '1rem', position: 'relative' }}>
        <input
          type="text"
          placeholder="Search friends..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 2rem 0.5rem 0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
          }}
        />
        <FaSearch style={{
          position: 'absolute',
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#666'
        }} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filteredFriends.map(f => (
          <div
            key={f.id}
            onClick={() => onSelect(f)}
            style={{
              padding: '0.75rem',
              marginBottom: '0.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              background: selectedFriend.id === f.id ? '#d0e6ff' : 'transparent'
            }}
          >
            {f.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
