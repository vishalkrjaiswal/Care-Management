import React, { useState, useEffect } from 'react'
import { User, CareForm } from './types'
import UsersTab from './components/UsersTab'
import CareFormsTab from './components/CareFormsTab'

const usersData: User[] = [
  { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", phone: "1-770-736-8031 x56442", website: "hildegard.org", address: { street: "Kulas Light", suite: "Apt. 556", city: "Gwenborough", zipcode: "92998-3874" }, company: { name: "Romaguera-Crona", catchPhrase: "Multi-layered client-server neural-net" } },
  { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", phone: "010-692-6593 x09125", website: "anastasia.net", address: { street: "Victor Plains", suite: "Suite 879", city: "Wisokyburgh", zipcode: "90566-7771" }, company: { name: "Deckow-Crist", catchPhrase: "Proactive didactic contingency" } },
  { id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net", phone: "1-463-123-4447", website: "ramiro.info", address: { street: "Douglas Extension", suite: "Suite 847", city: "McKenziehaven", zipcode: "59590-4157" }, company: { name: "Romaguera-Jacobson", catchPhrase: "Face to face bifurcated interface" } },
  { id: 4, name: "Patricia Lebsack", username: "Karianne", email: "Julianne.OConner@kory.org", phone: "493-170-9623 x156", website: "kale.biz", address: { street: "Hoeger Mall", suite: "Apt. 692", city: "South Elvis", zipcode: "53919-4257" }, company: { name: "Robel-Corkery", catchPhrase: "Multi-tiered zero tolerance productivity" } },
  { id: 5, name: "Chelsey Dietrich", username: "Kamren", email: "Lucio_Hettinger@annie.ca", phone: "(254)954-1289", website: "demarco.info", address: { street: "Skiles Walks", suite: "Suite 351", city: "Roscoeview", zipcode: "33263" }, company: { name: "Keebler LLC", catchPhrase: "User-centric fault-tolerant solution" } },
  { id: 6, name: "Mrs. Dennis Schulist", username: "Leopoldo_Corkery", email: "Karley_Dach@jasper.info", phone: "1-477-935-8478 x6430", website: "ola.org", address: { street: "Norberto Crossing", suite: "Apt. 950", city: "South Christy", zipcode: "23505-1337" }, company: { name: "Considine-Lockman", catchPhrase: "Synchronised bottom-line interface" } },
  { id: 7, name: "Kurtis Weissnat", username: "Elwyn.Skiles", email: "Telly.Hoeger@billy.biz", phone: "210.067.6132", website: "elvis.io", address: { street: "Rex Trail", suite: "Suite 280", city: "Howemouth", zipcode: "58804-1099" }, company: { name: "Johns Group", catchPhrase: "Configurable multimedia task-force" } },
  { id: 8, name: "Nicholas Runolfsdottir V", username: "Maxime_Nienow", email: "Sherwood@rosamond.me", phone: "586.493.6943 x140", website: "jacynthe.com", address: { street: "Ellsworth Summit", suite: "Suite 729", city: "Aliyaview", zipcode: "45169" }, company: { name: "Abernathy Group", catchPhrase: "Implemented secondary concept" } },
  { id: 9, name: "Glenna Reichert", username: "Delphine", email: "Chaim_McDermott@dana.io", phone: "(775)976-6794 x41206", website: "conrad.com", address: { street: "Dayna Park", suite: "Suite 449", city: "Bartholomebury", zipcode: "76495-3109" }, company: { name: "Yost and Sons", catchPhrase: "Switchable contextually-based project" } },
  { id: 10, name: "Clementina DuBuque", username: "Moriah.Stanton", email: "Rey.Padberg@karina.biz", phone: "024-648-3804", website: "ambrose.net", address: { street: "Kattie Turnpike", suite: "Suite 198", city: "Lebsackbury", zipcode: "31428-2261" }, company: { name: "Hoeger LLC", catchPhrase: "Centralized empowering task-force" } },
]

function App() {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState<User[]>([])
  const [forms, setForms] = useState<CareForm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // simulating API fetch from https://jsonplaceholder.typicode.com/users
    setTimeout(() => {
      try {
        setUsers(usersData)
        setLoading(false)
      } catch (err) {
        setError('Failed to load users!')
        setLoading(false)
      }
    }, 800)
  }, [])

  function addUser(name: string, email: string, phone: string) {
    const newUser: User = {
      id: Date.now(),
      name,
      username: name.toLowerCase().split(' ')[0],
      email,
      phone,
      website: '',
      address: { street: '', suite: '', city: '', zipcode: '' },
      company: { name: '', catchPhrase: '' },
    }
    setUsers([...users, newUser])
  }

  function editUser(updatedUser: User) {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
  }

  function deleteUser(id: number) {
    setUsers(users.filter((u) => u.id !== id))
    setForms(forms.filter((f) => f.userId !== id))
  }

  function addForm(form: CareForm) {
    setForms([...forms, form])
  }

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div>
          <h1>Careflick</h1>
          <p>Care Management Dashboard</p>
        </div>
        <div style={{ fontSize: '13px' }}>Total Users: {users.length}</div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === 'users' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('users')}
        >
          Users ({users.length})
        </button>
        <button
          className={activeTab === 'forms' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('forms')}
        >
          Care Forms ({forms.length})
        </button>
      </div>

      {/* Content */}
      <div className="content">
        {loading && <div className="loading">Loading users...</div>}
        {error   && <div className="error-msg">{error}</div>}

        {!loading && !error && activeTab === 'users' && (
          <UsersTab
            users={users}
            forms={forms}
            onAddUser={addUser}
            onEditUser={editUser}
            onDeleteUser={deleteUser}
          />
        )}

        {!loading && !error && activeTab === 'forms' && (
          <CareFormsTab users={users} onAddForm={addForm} />
        )}
      </div>
    </div>
  )
}

export default App