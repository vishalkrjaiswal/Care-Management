# Care Management Dashboard

React + TypeScript project built with **Vite** (fast, no service worker issues).

## How to Run

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Why Vite instead of Create React App?

Create React App (`react-scripts`) is deprecated and causes blank screen issues due to:
- Automatic service worker registration
- Broken compatibility with newer Node versions
- Much slower startup

Vite starts in under 1 second and has none of these problems.

## Project Structure

```
careflick-vite/
├── index.html                        ← Vite entry HTML (root level)
├── vite.config.ts                    ← Vite config
├── src/
│   ├── main.tsx                      ← Entry point
│   ├── App.tsx                       ← Main component, holds all state
│   ├── App.css                       ← All styles
│   ├── types.ts                      ← TypeScript interfaces
│   └── components/
│       ├── UsersTab.tsx              ← User cards, search, pagination, CRUD
│       ├── UserDetailModal.tsx       ← User detail popup + submitted forms
│       ├── AddEditUserModal.tsx      ← Add / Edit user form
│       ├── CareFormsTab.tsx          ← Switches between the two forms
│       ├── HealthCheckForm.tsx       ← Health check form with validation
│       └── MedicationForm.tsx        ← Medication form with validation
```
