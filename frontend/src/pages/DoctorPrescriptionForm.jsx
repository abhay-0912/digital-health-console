import React, { useEffect, useState } from 'react'
import { authClient } from '../apiClient'

function DoctorPrescriptionForm() {
  const [patients, setPatients] = useState([])
  const [patientId, setPatientId] = useState('')
  const [medicines, setMedicines] = useState([{ name: '', dose: '', frequency: '' }])
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token) return (window.location.href = '/')
    if (role !== 'doctor') return (window.location.href = '/dashboard/patient')
    authClient()
      .get('/api/dashboard/doctor')
      .then(res => {
        setPatients(res.data.patients || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load patients')
        setLoading(false)
      })
  }, [])

  const addMedicineField = () => {
    setMedicines([...medicines, { name: '', dose: '', frequency: '' }])
  }

  const updateMedicine = (idx, field, value) => {
    const updated = medicines.map((m, i) => (i === idx ? { ...m, [field]: value } : m))
    setMedicines(updated)
  }

  const removeMedicine = (idx) => {
    setMedicines(medicines.filter((_, i) => i !== idx))
  }

  const submitPrescription = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      const cleanMeds = medicines.filter(m => m.name.trim())
      await authClient().post('/api/prescriptions', {
        patientId: parseInt(patientId),
        medicines: cleanMeds,
        notes
      })
      setSuccess(true)
      setMedicines([{ name: '', dose: '', frequency: '' }])
      setNotes('')
      setPatientId('')
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 p-6">
      <div className="max-w-3xl mx-auto">
        <a href="/dashboard/doctor" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Doctor Dashboard
        </a>
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" /></svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Create Prescription</h1>
            <p className="text-gray-600 mt-2">Assign medications and notes for a patient</p>
          </div>
          {loading ? <p>Loading patients...</p> : (
            <form onSubmit={submitPrescription} className="space-y-6">
              {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</div>}
              {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">Prescription saved successfully!</div>}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Select Patient</label>
                <select value={patientId} onChange={e => setPatientId(e.target.value)} required className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all">
                  <option value="" disabled>Choose patient...</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name} (#{p.id})</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Medicines</label>
                <div className="space-y-4">
                  {medicines.map((m, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-pink-50 p-4 rounded-xl">
                      <div className="md:col-span-2">
                        <input type="text" placeholder="Name" value={m.name} onChange={e => updateMedicine(idx, 'name', e.target.value)} className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none" />
                      </div>
                      <div>
                        <input type="text" placeholder="Dose" value={m.dose} onChange={e => updateMedicine(idx, 'dose', e.target.value)} className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none" />
                      </div>
                      <div>
                        <input type="text" placeholder="Frequency" value={m.frequency} onChange={e => updateMedicine(idx, 'frequency', e.target.value)} className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none" />
                      </div>
                      <div className="flex gap-2 md:col-span-4">
                        {medicines.length > 1 && <button type="button" onClick={() => removeMedicine(idx)} className="text-xs px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">Remove</button>}
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addMedicineField} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium hover:shadow-md">Add Medicine</button>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Notes</label>
                <textarea rows={4} placeholder="Doctor remarks..." value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all resize-none" />
              </div>
              <button disabled={saving} className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-4 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Prescription'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorPrescriptionForm
