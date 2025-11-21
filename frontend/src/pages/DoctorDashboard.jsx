import React, { useEffect, useState } from 'react'
import { authClient } from '../apiClient'

function DoctorDashboard() {
  const [data, setData] = useState({ appointments: [], prescriptions: [], patients: [] })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token) return (window.location.href = '/')
    if (role !== 'doctor') return (window.location.href = '/dashboard/patient')
    authClient()
      .get('/api/dashboard/doctor')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [])

  const logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Doctor Dashboard</h1>
          <button onClick={logout} className="text-gray-600 hover:text-red-600 font-medium">Logout</button>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <a href="/prescriptions" className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M7 5h5.586" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-1">Prescriptions</h3>
            <p className="text-sm text-gray-600">Review & manage</p>
          </a>
          <a href="#patients" className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-1">Patients</h3>
            <p className="text-sm text-gray-600">Your active patients</p>
          </a>
          <a href="#appointments" className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <a href="/doctor/prescribe" className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-1">New Prescription</h3>
              <p className="text-sm text-gray-600">Create for patient</p>
            </a>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-1">Appointments</h3>
            <p className="text-sm text-gray-600">Upcoming schedule</p>
          </a>
        </div>
        <div id="appointments" className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Upcoming Appointments</h2>
          {data.appointments.length === 0 ? <p className="text-gray-500">No appointments scheduled.</p> : (
            <ul className="space-y-4">{data.appointments.map(a => (
              <li key={a.id} className="p-4 bg-blue-50 rounded-lg">
                <p className="font-medium">{new Date(a.time).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Patient ID: {a.patientId}</p>
              </li>
            ))}</ul>
          )}
        </div>
        <div id="patients" className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Patients</h2>
          {data.patients.length === 0 ? <p className="text-gray-500">No active patients.</p> : (
            <ul className="space-y-4">{data.patients.map(p => (
              <li key={p.id} className="p-4 bg-green-50 rounded-lg">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-600">Email: {p.email}</p>
              </li>
            ))}</ul>
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Prescriptions</h2>
          {data.prescriptions.length === 0 ? <p className="text-gray-500">No prescriptions yet.</p> : (
            <ul className="space-y-4">{data.prescriptions.map(p => (
              <li key={p.id} className="p-4 bg-purple-50 rounded-lg">
                <p className="font-medium">Patient ID: {p.patientId}</p>
                <p className="text-sm text-gray-600">{p.notes}</p>
              </li>
            ))}</ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
