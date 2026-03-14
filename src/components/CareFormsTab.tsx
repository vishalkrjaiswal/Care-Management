import React, { useState } from 'react'
import { User, CareForm } from '../types'
import HealthCheckForm from './HealthCheckForm'
import MedicationForm from './MedicationForm'

interface Props {
  users: User[]
  onAddForm: (form: CareForm) => void
}

function CareFormsTab({ users, onAddForm }: Props) {
  const [activeForm, setActiveForm] = useState('health')

  return (
    <div>
      <div className="form-selector">
        <button
          className={activeForm === 'health' ? 'form-select-card active' : 'form-select-card'}
          onClick={() => setActiveForm('health')}
        >
          <h4>Health Check Form</h4>
          <p>Vitals and clinical assessment</p>
        </button>
        <button
          className={activeForm === 'medication' ? 'form-select-card active' : 'form-select-card'}
          onClick={() => setActiveForm('medication')}
        >
          <h4>Medication Form</h4>
          <p>Prescription and drug tracking</p>
        </button>
      </div>

      {activeForm === 'health'    && <HealthCheckForm users={users} onAddForm={onAddForm} />}
      {activeForm === 'medication'&& <MedicationForm  users={users} onAddForm={onAddForm} />}
    </div>
  )
}

export default CareFormsTab