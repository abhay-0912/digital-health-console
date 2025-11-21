import React, { useEffect, useState } from 'react'
import { authClient } from '../apiClient'

function PatientDashboard() {
  const [data, setData] = useState({ records: [], appointments: [], prescriptions: [] })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token) return (window.location.href = '/')
    if (role !== 'patient') return (window.location.href = '/dashboard/doctor')
    authClient()
      .get('/api/dashboard/patient')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [])

  const logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Patient Dashboard</h1>
          <button onClick={logout} className="text-gray-600 hover:text-red-600 font-medium">Logout</button>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <a href="/add-record" className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-1">Add Health Record</h3>
            <p className="text-sm text-gray-600">Track vitals & symptoms</p>
          </a>
          <a href="/book-appointment" className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-1">Book Appointment</h3>
            <p className="text-sm text-gray-600">Schedule with doctor</p>
          </a>
          <a href="/prescriptions" className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M7 5h5.586" /></svg>
            </div>
            <h3 className="text-lg font-bold mb-1">Prescriptions</h3>
            <p className="text-sm text-gray-600">View medications</p>
          </a>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Health Records</h2>
          {data.records.length === 0 ? <p className="text-gray-500">No records yet.</p> : (
            <div className="space-y-4">{data.records.map(r => (
              <div key={r.id} className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded-lg">
                <p className="font-bold">{new Date(r.date).toLocaleString()}</p>
                <p className="my-2">{r.symptoms}</p>
                {r.vitals && <p className="text-sm text-gray-600">{JSON.stringify(r.vitals)}</p>}
              </div>
            ))}</div>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
            {data.appointments.length === 0 ? <p className="text-gray-500">No appointments.</p> : (
              <ul className="space-y-3">{data.appointments.map(a => (
                <li key={a.id} className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium">{new Date(a.time).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Doctor ID: {a.doctorId}</p>
                </li>
              ))}</ul>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recent Prescriptions</h2>
            {data.prescriptions.length === 0 ? <p className="text-gray-500">None yet.</p> : (
              <ul className="space-y-3">{data.prescriptions.map(p => (
                <li key={p.id} className="p-4 bg-purple-50 rounded-lg">
                  <p className="font-medium">Doctor ID: {p.doctorId}</p>
                  <p className="text-sm text-gray-600">{p.notes}</p>
                </li>
              ))}</ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
