import axios from "axios";

const apiClient = axios.create({
  baseURL: "",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  async getAllArtworks() {
    const response = await apiClient.get('/artworks')
    return response.data;
  },
  async getAllArtists(){
    const response = await apiClient.get('/artists')
    return response.data
  },
  async authenticate(email, password){
    const body = {
      email,
      password
    }
    const response = await apiClient.post('/auth', body)
    return response.data
  }
}