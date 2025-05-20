"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { AuthContext } from "../context/AuthContext"
import { Search, MapPin, Users, Clock, ArrowRight } from "lucide-react"
import * as api from "../api"

export default function Receive() {
  const [donations, setDonations] = useState([])
  const [filteredDonations, setFilteredDonations] = useState([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { user, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    async function fetchDonations() {
      setLoading(true)
      try {
        const { data } = await api.getAllDonations()
        setDonations(data)
        setFilteredDonations(data)
      } catch (error) {
        console.error("Error fetching donations:", error)
        setError(error.response?.data?.message || "Failed to load donations")
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [])

  useEffect(() => {
    if (filter) {
      const filtered = donations.filter((item) => item.location.toLowerCase().includes(filter.toLowerCase()))
      setFilteredDonations(filtered)
    } else {
      setFilteredDonations(donations)
    }
  }, [filter, donations])

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleReceiveClick = async (donationId) => {
    if (!isAuthenticated) {
      navigate("/signin")
      return
    }

    // Show an initial alert to confirm the action
    const isConfirmed = window.confirm("Are you sure you want to receive this donation?")

    if (!isConfirmed) return

    try {
      await api.reserveDonation(donationId)

      // Show a second alert to confirm the final action
      const isFinalConfirmed = window.confirm("Donation reserved! Do you want to view the details?")

      if (isFinalConfirmed) {
        navigate(`/details/${donationId}`)
      } else {
        // Refresh the donations list
        const { data } = await api.getAllDonations()
        setDonations(data)
        setFilteredDonations(data)
      }
    } catch (error) {
      console.error("Error reserving donation:", error)
      alert(error.response?.data?.message || "Failed to reserve donation. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-beige-50">
      <Navbar />

      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-green-700">Available</span> <span className="text-orange-500">Donations</span>
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse available food donations in your area and help reduce food waste while helping those in need.
              </p>
            </div>

            <div className="relative mb-8 max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Filter by Location"
                value={filter}
                onChange={handleFilterChange}
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-md">
                <div className="text-red-500 mb-4">
                  <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Error Loading Donations</h3>
                <p className="text-gray-500">{error}</p>
              </div>
            ) : filteredDonations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-md">
                <div className="text-gray-500 mb-4">
                  <Search className="h-12 w-12 mx-auto text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No donations found</h3>
                <p className="text-gray-500">Try adjusting your search or check back later for new donations.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDonations.map((donation) => (
                  <div
                    key={donation._id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                  >
                    {donation.imageUrl && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={donation.imageUrl || "/placeholder.svg"}
                          alt="Food donation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <MapPin className="h-5 w-5 text-orange-500 mr-2" />
                        <h3 className="text-lg font-bold text-gray-800">{donation.location}</h3>
                      </div>

                      <p className="text-gray-700 mb-4">{donation.foodDetails}</p>

                      <div className="flex items-center text-gray-600 mb-2">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Feeds approximately {donation.feedablePeople} people</span>
                      </div>

                      <div className="flex items-center text-gray-600 mb-6">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Available now</span>
                      </div>

                      <button
                        onClick={() => handleReceiveClick(donation._id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center justify-center transition-all"
                      >
                        Receive This Donation <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
