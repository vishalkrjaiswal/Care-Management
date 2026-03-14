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