import React from 'react';
import type { Toast as ToastType } from '../types';

// ─── Avatar ──────────────────────────────────────────────────────────────────

const AVATAR_COLORS = ['avatar-teal', 'avatar-blue', 'avatar-amber', 'avatar-coral', 'avatar-purple'];

export function getAvatarClass(id: number): string {
  return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

interface AvatarProps {
  id: number;
  name: string;
  size?: number;
  fontSize?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ id, name, size = 44, fontSize = 15 }) => (
  <div
    className={`avatar ${getAvatarClass(id)}`}
    style={{ width: size, height: size, fontSize }}
    aria-label={`Avatar for ${name}`}
  >
    {getInitials(name)}
  </div>
);

// ─── Icon (thin inline SVG wrapper) ──────────────────────────────────────────

interface IconProps {
  d: string | string[];
  extra?: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ d, extra, size = 16, style, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
    {extra}
  </svg>
);

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastContainerProps {
  toasts: ToastType[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => (
  <div className="toast-container" aria-live="polite">
    {toasts.map((t) => (
      <div key={t.id} className={`toast toast-${t.type}`} role="alert">
        <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}</span>
        {t.message}
      </div>
    ))}
  </div>
);

// ─── Spinner ─────────────────────────────────────────────────────────────────

export const Spinner: React.FC = () => (
  <div className="loading-state">
    <div className="spinner" role="status" aria-label="Loading" />
    <span style={{ fontSize: 14, color: 'var(--muted)' }}>Loading patients…</span>
  </div>
);

// ─── Confirm Modal ────────────────────────────────────────────────────────────

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => (
  <div className="overlay" role="dialog" aria-modal="true" aria-label="Confirm action">
    <div className="modal modal-sm">
      <div className="modal-header">
        <div className="modal-title" style={{ color: 'var(--danger)' }}>Confirm Delete</div>
        <button className="modal-close" onClick={onCancel} aria-label="Close">×</button>
      </div>
      <div className="modal-body">
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{message}</p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger btn-sm" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);