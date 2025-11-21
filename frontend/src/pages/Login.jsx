import React, { useState } from 'react'
import { publicClient } from '../apiClient'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await publicClient.post('/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.user.role)
      alert('Login successful')
      if (res.data.user.role === 'doctor') {
        window.location.href = '/dashboard/doctor'
      } else {
        window.location.href = '/dashboard/patient'
      }
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <form className="relative bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md" onSubmit={handleLogin}>
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Login to your health dashboard</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
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
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
              required
            />
          </div>
        </div>
        <button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all">Login</button>
        <div className="text-center mt-6">
          <a href="/register" className="text-sm text-blue-600 hover:text-purple-600 font-medium">Don't have an account? Register now</a>
        </div>
      </form>
    </div>
  )
}

export default Login
