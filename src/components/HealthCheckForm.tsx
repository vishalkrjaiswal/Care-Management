import React, { useState } from 'react'
import { User, CareForm } from '../types'

interface Props {
  users: User[]
  onAddForm: (form: CareForm) => void
}

function HealthCheckForm({ users, onAddForm }: Props) {
  const [userId,      setUserId]      = useState('')
  const [date,        setDate]        = useState('')
  const [weight,      setWeight]      = useState('')
  const [height,      setHeight]      = useState('')
  const [systolic,    setSystolic]    = useState('')
  const [diastolic,   setDiastolic]   = useState('')
  const [heartRate,   setHeartRate]   = useState('')
  const [temperature, setTemperature] = useState('')
  const [medications, setMedications] = useState('')
  const [symptoms,    setSymptoms]    = useState('')
  const [notes,       setNotes]       = useState('')

  const [errors,    setErrors]    = useState<any>({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    let newErrors: any = {}
    if (!userId)   newErrors.userId   = 'Please select a patient'
    if (!date)     newErrors.date     = 'Date is required'
    if (!weight)   newErrors.weight   = 'Weight is required'
    else if (isNaN(Number(weight)) || Number(weight) <= 0) newErrors.weight = 'Enter valid weight'
    if (!height)   newErrors.height   = 'Height is required'
    else if (isNaN(Number(height)) || Number(height) <= 0) newErrors.height = 'Enter valid height'
    if (!systolic)  newErrors.systolic  = 'Systolic BP is required'
    if (!diastolic) newErrors.diastolic = 'Diastolic BP is required'
    if (!heartRate) newErrors.heartRate = 'Heart rate is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (!validate()) return

    const newForm: CareForm = {
      id: Date.now(),
      userId: Number(userId),
      formType: 'Health Check',
      submittedDate: date,
      data: { weight, height, systolic, diastolic, heartRate, temperature, medications, symptoms, notes },
    }

    onAddForm(newForm)

    // reset all fields
    setUserId(''); setDate(''); setWeight(''); setHeight('')
    setSystolic(''); setDiastolic(''); setHeartRate(''); setTemperature('')
    setMedications(''); setSymptoms(''); setNotes('')
    setErrors({})
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  function handleReset() {
    setUserId(''); setDate(''); setWeight(''); setHeight('')
    setSystolic(''); setDiastolic(''); setHeartRate(''); setTemperature('')
    setMedications(''); setSymptoms(''); setNotes('')
    setErrors({})
  }

  return (
    <div className="form-card">
      <h3>Health Check Form</h3>

      {submitted && <div className="success-msg">Health Check Form submitted successfully!</div>}

      <div className="form-group">
        <label>Select Patient *</label>
        <select className={errors.userId ? 'input-error' : ''} value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">-- Select a patient --</option>
          {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        {errors.userId && <p className="error-text">{errors.userId}</p>}
      </div>

      <div className="form-group">
        <label>Assessment Date *</label>
        <input type="date" className={errors.date ? 'input-error' : ''} value={date} onChange={(e) => setDate(e.target.value)} />
        {errors.date && <p className="error-text">{errors.date}</p>}
      </div>

      <hr className="hr" />
      <p className="subsection">Vital Signs</p>

      <div className="form-row">
        <div className="form-group">
          <label>Weight (kg) *</label>
          <input type="number" className={errors.weight ? 'input-error' : ''} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" />
          {errors.weight && <p className="error-text">{errors.weight}</p>}
        </div>
        <div className="form-group">
          <label>Height (cm) *</label>
          <input type="number" className={errors.height ? 'input-error' : ''} value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 175" />
          {errors.height && <p className="error-text">{errors.height}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Blood Pressure - Systolic *</label>
          <input type="number" className={errors.systolic ? 'input-error' : ''} value={systolic} onChange={(e) => setSystolic(e.target.value)} placeholder="e.g. 120" />
          {errors.systolic && <p className="error-text">{errors.systolic}</p>}
        </div>
        <div className="form-group">
          <label>Blood Pressure - Diastolic *</label>
          <input type="number" className={errors.diastolic ? 'input-error' : ''} value={diastolic} onChange={(e) => setDiastolic(e.target.value)} placeholder="e.g. 80" />
          {errors.diastolic && <p className="error-text">{errors.diastolic}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Heart Rate (bpm) *</label>
          <input type="number" className={errors.heartRate ? 'input-error' : ''} value={heartRate} onChange={(e) => setHeartRate(e.target.value)} placeholder="e.g. 72" />
          {errors.heartRate && <p className="error-text">{errors.heartRate}</p>}
        </div>
        <div className="form-group">
          <label>Temperature (°C)</label>
          <input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} placeholder="e.g. 36.6" />
        </div>
      </div>

      <hr className="hr" />
      <p className="subsection">Clinical Notes</p>

      <div className="form-group">
        <label>Current Medications</label>
        <textarea value={medications} onChange={(e) => setMedications(e.target.value)} placeholder="List any current medications..." />
      </div>
      <div className="form-group">
        <label>Symptoms / Complaints</label>
        <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Describe symptoms..." />
      </div>
      <div className="form-group">
        <label>Additional Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any extra observations..." />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit Form</button>
      </div>
    </div>
  )
}

export default HealthCheckForm