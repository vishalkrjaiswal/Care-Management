import React from 'react'
import { User, CareForm } from '../types'

interface Props {
  user: User
  forms: CareForm[]
  onClose: () => void
}

function UserDetailModal({ user, forms, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h2>{user.name}</h2>
        <p style={{ color: '#888', marginBottom: '16px', fontSize: '13px' }}>@{user.username}</p>

        <div className="section-title">Contact Information</div>
        <div className="detail-row"><span className="detail-label">Email:</span><span className="detail-value">{user.email}</span></div>
        <div className="detail-row"><span className="detail-label">Phone:</span><span className="detail-value">{user.phone}</span></div>
        <div className="detail-row"><span className="detail-label">Website:</span><span className="detail-value">{user.website || 'N/A'}</span></div>

        <div className="section-title">Address</div>
        <div className="detail-row"><span className="detail-label">Street:</span><span className="detail-value">{user.address.street} {user.address.suite}</span></div>
        <div className="detail-row"><span className="detail-label">City:</span><span className="detail-value">{user.address.city}, {user.address.zipcode}</span></div>

        {user.company.name && (
          <>
            <div className="section-title">Company</div>
            <div className="detail-row"><span className="detail-label">Name:</span><span className="detail-value">{user.company.name}</span></div>
            <div className="detail-row"><span className="detail-label">Tagline:</span><span className="detail-value" style={{ fontStyle: 'italic' }}>"{user.company.catchPhrase}"</span></div>
          </>
        )}

        <div className="section-title">Submitted Care Forms ({forms.length})</div>

        {forms.length === 0 ? (
          <p style={{ color: '#999', fontSize: '14px', textAlign: 'center', padding: '16px 0' }}>
            No care forms submitted yet.
          </p>
        ) : (
          forms.map((form) => (
            <div key={form.id} className="submitted-form-item">
              <strong>{form.formType}</strong>
              <span style={{ color: '#888' }}>Submitted on: {form.submittedDate}</span>
            </div>
          ))
        )}

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default UserDetailModal