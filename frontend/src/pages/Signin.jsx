
// src/pages/Signin.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { username, password };
    axios
      .post('http://localhost:8080/signIn', data)
      .then(res => {
        console.log('Sign in OK:', res.data);
        // **STORE** the username for later
        localStorage.setItem('username', username);

        const role = res.data;
        if (role === 'admin') {
          navigate('/admin_page');
        } else if (role === 'customer') {
          navigate('/customer_page');
        } else {
          alert('Unknown role: ' + role);
        }
      })
      .catch(err => {
        console.error('Signin failed:', err);
        alert('Error signing in – check console');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">
  <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

  <input
    type="text"
    placeholder="Username"
    className="w-full p-2 mb-3 border rounded"
    value={username}
    onChange={e => setUsername(e.target.value)}
  />

  <input
    type="password"
    placeholder="Password"
    className="w-full p-2 mb-4 border rounded"
    value={password}
    onChange={e => setPassword(e.target.value)}
  />

  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
    Sign In
  </button>
</form>
  );
}
