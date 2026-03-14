export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
  company: {
    name: string
    catchPhrase: string
  }
}

export interface CareForm {
  id: number
  userId: number
  formType: string
  submittedDate: string
  data: any
}

// used when adding a new user (only these 3 fields are required)
export interface NewUserInput {
  name: string
  email: string
  phone: string
}

// used for toast notifications
export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}