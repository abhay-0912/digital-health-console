import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import DoctorPrescriptionForm from './pages/DoctorPrescriptionForm'
import AddHealthRecord from './pages/AddHealthRecord'
import BookAppointment from './pages/BookAppointment'
import Prescriptions from './pages/Prescriptions'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/patient" element={<PatientDashboard />} />
      <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/prescribe" element={<DoctorPrescriptionForm />} />
      <Route path="/add-record" element={<AddHealthRecord />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
    </Routes>
  )
}

export default App
