import React, { useEffect, useState } from 'react'
import { authClient } from '../apiClient'

function Prescriptions() {
  const [list, setList] = useState([])

  useEffect(() => {
    authClient()
      .get('/api/prescriptions')
      .then((res) => setList(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <a href="/dashboard/patient" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </a>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Your Prescriptions</h1>
            <p className="text-gray-600 mt-2">View your medications and doctor notes</p>
          </div>

          {list.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-lg">No prescriptions yet</p>
              <p className="text-gray-400 text-sm mt-2">Your doctor will add prescriptions here</p>
            </div>
          ) : (
            <div className="space-y-5">
              {list.map((p) => (
                <div key={p.id} className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Prescribed by</p>
                      <p className="font-bold text-gray-800">Doctor ID: {p.doctorId}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Active</span>
                  </div>
                  
                  {p.medicines && p.medicines.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Medications:</p>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-gray-800">{JSON.stringify(p.medicines)}</p>
                      </div>
                    </div>
                  )}
                  
                  {p.notes && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Doctor's Notes:</p>
                      <p className="text-gray-700 bg-white rounded-lg p-3">{p.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Prescriptions
