import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  
  async createArtist(artist) {
    const response = await apiClient.post('/artists', artist)
    return response.data
  },

  async createContact(contact) {
    const response = await apiClient.post('/contacts', contact)
    return response.data
  },

  async createEmployee(employee) {
    const response = await apiClient.post('/employees', employee)
    return response.data
  },

  async deleteArtist(artist) {
    const response = await apiClient.delete(`/artists/${artist._id}`, artist)
    return response.data
  },

  async deleteContact(contact) {
    const response = await apiClient.delete(`/contacts/${contact._id}`, contact)
    return response.data
  },

  async deleteEmployee(employee) {
    const response = await apiClient.delete(
      `/employees/${employee._id}`,
      employee
    )
    return response.data
  },

  async updateArtist(artist) {
    const response = await apiClient.put(`/artists/${artist._id}`, artist)
    return response.data
  },

  async updateContact(contact) {
    const response = await apiClient.put(`/contacts/${contact._id}`, contact)
    return response.data
  },

  async updateEmployee(employee) {
    const response = await apiClient.put(`/employees/${employee._id}`, employee)
    return response.data
  },

  async getAllArtists() {
    const response = await apiClient.get('/artists/')
    return response.data
  },

  async getAllEmployees() {
    const response = await apiClient.get('/employees/')
    return response.data
  },

  async getAllContacts() {
    const response = await apiClient.get('/contacts/')
    return response.data
  },

  async authenticate(email, password) {
    const body = {
      email,
      password,
    }
    const response = await apiClient.post('/auth', body)
    return response.data
  },
}
