import React, { useState } from 'react';
import type { User, NewUserInput } from '../types';

interface UserFormModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (data: NewUserInput & { id?: number }) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState<NewUserInput>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address';
    }
    if (!form.phone.trim()) {
      e.phone = 'Phone is required';
    } else if (!/^[\d\s\-+().x]+$/.test(form.phone)) {
      e.phone = 'Enter a valid phone number';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({ ...form, ...(user ? { id: user.id } : {}) });
    }
  };

  const set = (k: keyof NewUserInput, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const handleOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="overlay" onClick={handleOverlay} role="dialog" aria-modal="true">
      <div className="modal modal-sm">
        <div className="modal-header">
          <div className="modal-title">{user ? 'Edit User' : 'Add New User'}</div>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(['name', 'email', 'phone'] as const).map((k) => (
              <div key={k} className="form-group">
                <label className="form-label" htmlFor={`user-form-${k}`}>
                  {k.charAt(0).toUpperCase() + k.slice(1)}
                  <span className="req"> *</span>
                </label>
                <input
                  id={`user-form-${k}`}
                  type={k === 'email' ? 'email' : 'text'}
                  className={`form-input${errors[k] ? ' error' : ''}`}
                  value={form[k]}
                  onChange={(e) => set(k, e.target.value)}
                  placeholder={
                    k === 'email' ? 'user@example.com' :
                    k === 'phone' ? '+1-234-567-8900' :
                    'Full name'
                  }
                  autoComplete="off"
                  aria-describedby={errors[k] ? `${k}-error` : undefined}
                />
                {errors[k] && <span id={`${k}-error`} className="field-error" role="alert">{errors[k]}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
            {user ? 'Save Changes' : 'Add User'}
          </button>
        </div>
      </div>
    </div>
  );
};