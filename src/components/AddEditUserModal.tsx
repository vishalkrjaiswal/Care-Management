import React, { useState } from 'react'
import { User } from '../types'

interface Props {
  user: User | null
  onSave: (name: string, email: string, phone: string) => void
  onClose: () => void
}

function AddEditUserModal({ user, onSave, onClose }: Props) {
  const [name,  setName]  = useState(user ? user.name  : '')
  const [email, setEmail] = useState(user ? user.email : '')
  const [phone, setPhone] = useState(user ? user.phone : '')

  const [nameError,  setNameError]  = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  function validate() {
    let isValid = true
    setNameError(''); setEmailError(''); setPhoneError('')

    if (name.trim() === '') {
      setNameError('Name is required')
      isValid = false
    }
    if (email.trim() === '') {
      setEmailError('Email is required')
      isValid = false
    } else if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email')
      isValid = false
    }
    if (phone.trim() === '') {
      setPhoneError('Phone is required')
      isValid = false
    }

    return isValid
  }

  function handleSubmit() {
    if (validate()) {
      onSave(name, email, phone)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{user ? 'Edit User' : 'Add New User'}</h2>

        <div className="form-group">
          <label>Name *</label>
          <input type="text" className={nameError ? 'input-error' : ''} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" />
          {nameError && <p className="error-text">{nameError}</p>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input type="email" className={emailError ? 'input-error' : ''} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" />
          {emailError && <p className="error-text">{emailError}</p>}
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <input type="text" className={phoneError ? 'input-error' : ''} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" />
          {phoneError && <p className="error-text">{phoneError}</p>}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>{user ? 'Save Changes' : 'Add User'}</button>
        </div>
      </div>
    </div>
  )
}

export default AddEditUserModal