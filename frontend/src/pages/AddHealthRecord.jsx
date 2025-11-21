import React, { useState } from 'react'
import { authClient } from '../apiClient'

function AddHealthRecord() {
  const [symptoms, setSymptoms] = useState('')
  const [bp, setBp] = useState('')
  const [sugar, setSugar] = useState('')
  const [temp, setTemp] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authClient().post(
        '/api/health',
        { symptoms, vitals: { bp, sugar, temp } }
      )
      alert('Record added')
      window.location.href = '/dashboard/patient'
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      <div className="max-w-2xl mx-auto">
        <a href="/dashboard/patient" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </a>
        
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Add Health Record</h1>
            <p className="text-gray-600 mt-2">Track your vitals and symptoms</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Symptoms</label>
              <textarea
                placeholder="Describe your symptoms..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Blood Pressure</label>
                <input
                  type="text"
                  placeholder="120/80"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Sugar Level</label>
                <input
                  type="text"
                  placeholder="100 mg/dL"
                  value={sugar}
                  onChange={(e) => setSugar(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Temperature</label>
                <input
                  type="text"
                  placeholder="98.6°F"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-4 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all">Save Record</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddHealthRecord
