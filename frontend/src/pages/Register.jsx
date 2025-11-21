import React, { useState } from 'react'
import { publicClient } from '../apiClient'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('patient')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await publicClient.post('/api/auth/register', { name, email, password, role })
      alert('Registration successful! Please login.')
      window.location.href = '/'
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <form className="relative bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md" onSubmit={handleRegister}>
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Create Account</h1>
          <p className="text-gray-600 mt-2">Join Digital Health Console</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">I am a</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
        </div>
        <button className="w-full mt-8 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all">Create Account</button>
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-green-600 hover:text-teal-600 font-medium">Already have an account? Login</a>
        </div>
      </form>
    </div>
  )
}

export default Register
