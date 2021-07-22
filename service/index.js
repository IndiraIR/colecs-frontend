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

  // GETALL
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

  async getAllAuctions() {
    const response = await apiClient.get('/auctions/')
    return response.data
  },

  async getAllDocuments() {
    const response = await apiClient.get('/documents/')
    return response.data
  },

  async getAllArtworks() {
    const response = await apiClient.get('/artworks/')
    return response.data
  },

  async getAllWishs() {
    const response = await apiClient.get('/wishs/')
    return response.data
  },

  // CREATE

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

  async createAuction(auction) {
    const response = await apiClient.post('/auctions', auction)
    return response.data
  },

  async createDocument(document) {
    const response = await apiClient.post('/documents', document)
    return response.data
  },

  async createArtwork(artwork) {
    
    const response = await apiClient.post('/artworks', artwork)
    
    return response.data
  },

  async createWish(wish) {
    const response = await apiClient.post('/wishs', wish)
    return response.data
  },

  // DELETE

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

  async deleteAuction(auction) {
    const response = await apiClient.delete(`/auctions/${auction._id}`, auction)
    return response.data
  },

  async deleteDocument(document) {
    const response = await apiClient.delete(
      `/documents/${document._id}`,
      document
    )
    return response.data
  },

  async deleteArtwork(artwork) {
    const response = await apiClient.delete(`/artworks/${artwork._id}`, artwork)
    return response.data
  },

  async deleteWish(wish) {
    console.log(wish)
    const response = await apiClient.delete(`/wishs/${wish._id}`, wish)
    return response.data
  },

  // UPDATE

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

  async updateAuction(auction) {
    const response = await apiClient.put(`/auctions/${auction._id}`, auction)
    return response.data
  },

  async updateDocument(document) {
    const response = await apiClient.put(`/documents/${document._id}`, document)
    return response.data
  },

  async updateArtwork(artwork) {
    const response = await apiClient.put(`/artworks/${artwork._id}`, artwork)
    return response.data
  },

  async updateWish(wish) {
    const response = await apiClient.put(`/wishs/${wish._id}`, wish)
    return response.data
  },

  // AUTHENTICATE

  async authenticate(email, password) {
    const body = {
      email,
      password,
    }
    const response = await apiClient.post('/auth', body)
    return response.data
  },
}
