  // src/pages/Signup.jsx

  import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom'

  export default function Signup() {
    // 1. State for each field
    const [username, setUsername] = useState('');
    const [email, setEmail]     = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob]         = useState('');
    const [gender, setGender]   = useState('');
    const [role, setRole]       = useState('');

    const navigate = useNavigate();

    // 2. Submit handler
    const handleSubmit = (e) => {
      e.preventDefault();   // prevent page reload

      const user = { username, email, password, dob, gender, role };

      axios
        .post('http://localhost:8080/signUp', user)
        .then(res => {
          console.log('Signup OK:', res.data);
          alert('Signed up: ' + res.data);

          navigate('/sign_in_page')
        })
        .catch(err => {
          console.error('Signup failed:', err);
          alert('Error signing up – check console');
        });
    };

    return (
  <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
    <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

    <input
      type="text"
      placeholder="Username"
      className="w-full p-2 mb-3 border rounded"
      value={username}
      onChange={e => setUsername(e.target.value)}
    />

    <input
      type="email"
      placeholder="Email"
      className="w-full p-2 mb-3 border rounded"
      value={email}
      onChange={e => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full p-2 mb-3 border rounded"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />

    <div className="mb-3">
      <label className="block mb-1">Gender:</label>
      <div className="flex gap-3">
        <label><input type="radio" name="gender" value="MALE" onChange={e => setGender(e.target.value)} /> Male</label>
        <label><input type="radio" name="gender" value="FEMALE" onChange={e => setGender(e.target.value)} /> Female</label>
        <label><input type="radio" name="gender" value="OTHER" onChange={e => setGender(e.target.value)} /> Other</label>
      </div>
    </div>

    <input
      type="date"
      className="w-full p-2 mb-3 border rounded"
      value={dob}
      onChange={e => setDob(e.target.value)}
    />

    <div className="mb-4">
      <label className="block mb-1">Role:</label>
      <div className="flex gap-3">
        <label><input type="radio" name="role" value="ADMIN" onChange={e => setRole(e.target.value)} /> Admin</label>
        <label><input type="radio" name="role" value="CUSTOMER" onChange={e => setRole(e.target.value)} /> Customer</label>
      </div>
    </div>

    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
      Sign Up
    </button>
  </form>
    );
  }