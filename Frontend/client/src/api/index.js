import axios from "axios"

// Create axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
})

// Add auth token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

// Auth API calls
export const register = (userData) => API.post("/users/register", userData)
export const login = (userData) => API.post("/users/login", userData)
export const getUserProfile = () => API.get("/users/profile")
export const updateUserProfile = (userData) => API.put("/users/profile", userData)

// Donation API calls
export const createDonation = (donationData) => API.post("/donations", donationData)
export const getAllDonations = () => API.get("/donations")
export const getDonationById = (id) => API.get(`/donations/${id}`)
export const getUserDonations = () => API.get("/donations/user/donations")
export const updateDonationStatus = (id, status) => API.put(`/donations/${id}`, { status })
export const deleteDonation = (id) => API.delete(`/donations/${id}`)

// Receive API calls
export const reserveDonation = (id) => API.post(`/receive/reserve/${id}`)
export const confirmDonationReceived = (id, data) => API.post(`/receive/confirm/${id}`, data)
export const getUserReceivedDonations = () => API.get("/receive/user")
export const cancelReservation = (id) => API.put(`/receive/cancel/${id}`)

export default API
