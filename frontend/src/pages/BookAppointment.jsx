import React, { useState } from 'react'
import { authClient } from '../apiClient'

function BookAppointment() {
  const [doctorId, setDoctorId] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authClient().post(
        '/api/appointments/book',
        { doctorId: parseInt(doctorId), time }
      )
      alert('Appointment booked')
      window.location.href = '/dashboard/patient'
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <a href="/dashboard/patient" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </a>
        
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Book Appointment</h1>
            <p className="text-gray-600 mt-2">Schedule a consultation with your doctor</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Doctor ID</label>
              <input
                type="number"
                placeholder="Enter doctor ID"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-2">Contact your doctor to get their ID</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Appointment Date & Time</label>
              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                required
              />
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-4 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all">Book Appointment</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookAppointment
