import React, { useState } from 'react'
import { User, CareForm } from '../types'

interface Props {
  users: User[]
  onAddForm: (form: CareForm) => void
}

function MedicationForm({ users, onAddForm }: Props) {
  const [userId,           setUserId]           = useState('')
  const [prescriptionDate, setPrescriptionDate] = useState('')
  const [medicationName,   setMedicationName]   = useState('')
  const [dosage,           setDosage]           = useState('')
  const [frequency,        setFrequency]        = useState('')
  const [route,            setRoute]            = useState('oral')
  const [startDate,        setStartDate]        = useState('')
  const [endDate,          setEndDate]          = useState('')
  const [prescriber,       setPrescriber]       = useState('')
  const [condition,        setCondition]        = useState('')
  const [instructions,     setInstructions]     = useState('')
  const [sideEffects,      setSideEffects]      = useState('')

  const [errors,    setErrors]    = useState<any>({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    let newErrors: any = {}
    if (!userId)               newErrors.userId         = 'Please select a patient'
    if (!medicationName.trim())newErrors.medicationName = 'Medication name is required'
    if (!dosage.trim())        newErrors.dosage         = 'Dosage is required'
    if (!frequency)            newErrors.frequency      = 'Frequency is required'
    if (!prescriber.trim())    newErrors.prescriber     = 'Prescriber name is required'
    if (!startDate)            newErrors.startDate      = 'Start date is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (!validate()) return

    const newForm: CareForm = {
      id: Date.now(),
      userId: Number(userId),
      formType: 'Medication',
      submittedDate: prescriptionDate || new Date().toISOString().split('T')[0],
      data: { medicationName, dosage, frequency, route, startDate, endDate, prescriber, condition, instructions, sideEffects },
    }

    onAddForm(newForm)

    setUserId(''); setPrescriptionDate(''); setMedicationName(''); setDosage('')
    setFrequency(''); setRoute('oral'); setStartDate(''); setEndDate('')
    setPrescriber(''); setCondition(''); setInstructions(''); setSideEffects('')
    setErrors({})
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  function handleReset() {
    setUserId(''); setPrescriptionDate(''); setMedicationName(''); setDosage('')
    setFrequency(''); setRoute('oral'); setStartDate(''); setEndDate('')
    setPrescriber(''); setCondition(''); setInstructions(''); setSideEffects('')
    setErrors({})
  }

  return (
    <div className="form-card">
      <h3>Medication Form</h3>

      {submitted && <div className="success-msg">✅ Medication Form submitted successfully!</div>}

      <div className="form-row">
        <div className="form-group">
          <label>Select Patient *</label>
          <select className={errors.userId ? 'input-error' : ''} value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="">-- Select a patient --</option>
            {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          {errors.userId && <p className="error-text">{errors.userId}</p>}
        </div>
        <div className="form-group">
          <label>Prescription Date</label>
          <input type="date" value={prescriptionDate} onChange={(e) => setPrescriptionDate(e.target.value)} />
        </div>
      </div>

      <hr className="hr" />
      <p className="subsection">Medication Details</p>

      <div className="form-group">
        <label>Medication Name *</label>
        <input type="text" className={errors.medicationName ? 'input-error' : ''} value={medicationName} onChange={(e) => setMedicationName(e.target.value)} placeholder="e.g. Metformin 500mg" />
        {errors.medicationName && <p className="error-text">{errors.medicationName}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Dosage *</label>
          <input type="text" className={errors.dosage ? 'input-error' : ''} value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g. 500mg" />
          {errors.dosage && <p className="error-text">{errors.dosage}</p>}
        </div>
        <div className="form-group">
          <label>Frequency *</label>
          <select className={errors.frequency ? 'input-error' : ''} value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <option value="">Select...</option>
            <option>Once daily</option>
            <option>Twice daily</option>
            <option>Three times daily</option>
            <option>Every 4 hours</option>
            <option>Every 6 hours</option>
            <option>Weekly</option>
            <option>As needed (PRN)</option>
          </select>
          {errors.frequency && <p className="error-text">{errors.frequency}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Route</label>
          <select value={route} onChange={(e) => setRoute(e.target.value)}>
            <option value="oral">Oral</option>
            <option value="intravenous">Intravenous</option>
            <option value="intramuscular">Intramuscular</option>
            <option value="topical">Topical</option>
            <option value="inhaled">Inhaled</option>
            <option value="sublingual">Sublingual</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Date *</label>
          <input type="date" className={errors.startDate ? 'input-error' : ''} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          {errors.startDate && <p className="error-text">{errors.startDate}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>End Date (optional)</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Condition / Purpose</label>
          <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="e.g. Type 2 Diabetes" />
        </div>
      </div>

      <hr className="hr" />
      <p className="subsection">Prescriber Info</p>

      <div className="form-group">
        <label>Prescribing Doctor *</label>
        <input type="text" className={errors.prescriber ? 'input-error' : ''} value={prescriber} onChange={(e) => setPrescriber(e.target.value)} placeholder="Dr. Name" />
        {errors.prescriber && <p className="error-text">{errors.prescriber}</p>}
      </div>
      <div className="form-group">
        <label>Special Instructions</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Take with food, avoid alcohol..." />
      </div>
      <div className="form-group">
        <label>Known Side Effects / Allergies</label>
        <textarea value={sideEffects} onChange={(e) => setSideEffects(e.target.value)} placeholder="List any known reactions..." />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit Form</button>
      </div>
    </div>
  )
}

export default MedicationForm