import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Sales Savvy</h1>
      <p className="mb-8 text-lg">Your 1-stop shopping solution 🚀</p>

      <div className="space-x-4">
        <button
          className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow hover:bg-gray-200"
          onClick={() => navigate('/sign_in_page')}
        >
          Sign In
        </button>

        <button
          className="bg-black px-6 py-2 rounded-lg shadow hover:bg-gray-800"
          onClick={() => navigate('/sign_up_page')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}