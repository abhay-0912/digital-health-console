import React, { useEffect } from 'react'

// Legacy dashboard now only redirects based on role
function Dashboard() {
  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === 'doctor') {
      window.location.href = '/dashboard/doctor'
    } else {
      window.location.href = '/dashboard/patient'
    }
  }, [])
  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>
}

export default Dashboard
