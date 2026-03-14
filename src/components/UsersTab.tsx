import React, { useState } from 'react'
import { User, CareForm } from '../types'
import UserDetailModal from './UserDetailModal'
import AddEditUserModal from './AddEditUserModal'

interface Props {
  users: User[]
  forms: CareForm[]
  onAddUser: (name: string, email: string, phone: string) => void
  onEditUser: (user: User) => void
  onDeleteUser: (id: number) => void
}

const USERS_PER_PAGE = 6

function UsersTab({ users, forms, onAddUser, onEditUser, onDeleteUser }: Props) {
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  // filter by search
  const filteredUsers = users.filter((user) => {
    const search = searchText.toLowerCase()
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    )
  })

  // pagination
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  const startIndex = (currentPage - 1) * USERS_PER_PAGE
  const usersToShow = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE)

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value)
    setCurrentPage(1)
  }

  function handleDeleteClick(e: React.MouseEvent, id: number) {
    e.stopPropagation()
    const confirmed = window.confirm('Are you sure you want to delete this user?')
    if (confirmed) {
      onDeleteUser(id)
    }
  }

  function handleEditClick(e: React.MouseEvent, user: User) {
    e.stopPropagation()
    setEditingUser(user)
  }

  function handleSaveEdit(name: string, email: string, phone: string) {
    if (editingUser) {
      onEditUser({ ...editingUser, name, email, phone })
      setEditingUser(null)
    }
  }

  function handleAddUser(name: string, email: string, phone: string) {
    onAddUser(name, email, phone)
    setShowAddModal(false)
  }

  return (
    <div>
      {/* Search + Add button */}
      <div className="top-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or email..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add User
        </button>
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-results">No users found for "{searchText}"</div>
      )}

      {/* Cards */}
      <div className="users-grid">
        {usersToShow.map((user) => {
          const userForms = forms.filter((f) => f.userId === user.id)
          return (
            <div key={user.id} className="user-card" onClick={() => setSelectedUser(user)}>
              <h3>{user.name}</h3>
              <p>📧 {user.email}</p>
              <p>📞 {user.phone}</p>
              <div className="card-footer">
                <span className="forms-count">{userForms.length} forms</span>
                <div className="card-buttons">
                  <button className="btn btn-edit"   onClick={(e) => handleEditClick(e, user)}>Edit</button>
                  <button className="btn btn-danger" onClick={(e) => handleDeleteClick(e, user.id)}>Delete</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={currentPage === page ? 'page-btn active' : 'page-btn'}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button className="page-btn" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          forms={forms.filter((f) => f.userId === selectedUser.id)}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {showAddModal && (
        <AddEditUserModal user={null} onSave={handleAddUser} onClose={() => setShowAddModal(false)} />
      )}

      {editingUser && (
        <AddEditUserModal user={editingUser} onSave={handleSaveEdit} onClose={() => setEditingUser(null)} />
      )}
    </div>
  )
}

export default UsersTab