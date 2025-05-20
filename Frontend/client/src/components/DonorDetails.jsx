"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { MapPin, Phone, Mail, User, Check } from "lucide-react"
import * as api from "../api"

const DonorDetails = () => {
  const [donation, setDonation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmationSuccess, setConfirmationSuccess] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchDonationDetails() {
      if (!id) {
        setError("No donation ID provided")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const { data } = await api.getDonationById(id)
        setDonation(data)
      } catch (error) {
        console.error("Error fetching donation details:", error)
        setError(error.response?.data?.message || "Failed to load donation details")
      } finally {
        setLoading(false)
      }
    }

    fetchDonationDetails()
  }, [id])

  const confirmDonation = async () => {
    try {
      // This would typically include uploading a photo and confirming receipt
      // For now, we'll just update the status
      await api.confirmDonationReceived(id, {
        receiverContact: donation.receiverContact || "",
        receiverPhotoBase64: null, // In a real app, you'd include a photo
      })

      setConfirmationSuccess(true)
    } catch (error) {
      console.error("Error confirming donation:", error)
      alert(error.response?.data?.message || "Error confirming donation. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-beige-50">
      <Navbar />

      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
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
                <h2 className="text-xl font-bold mb-4">Error</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={() => navigate("/receive")}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-xl transition-all"
                >
                  Back to Donations
                </button>
              </div>
            ) : confirmationSuccess ? (
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Donation Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for helping reduce food waste and supporting those in need.
                </p>
                <button
                  onClick={() => navigate("/receive")}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-xl transition-all"
                >
                  Find More Donations
                </button>
              </div>
            ) : donation ? (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-6 px-8">
                  <h1 className="text-2xl font-bold text-white">Donor Details</h1>
                </div>

                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-orange-500 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Donor Name</h3>
                        <p className="text-lg font-semibold text-gray-800">{donation.donorName}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-orange-500 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p className="text-lg font-semibold text-gray-800">{donation.donorEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-orange-500 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Location</h3>
                        <p className="text-lg font-semibold text-gray-800">{donation.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-orange-500 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                        <p className="text-lg font-semibold text-gray-800">{donation.contact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-600 mb-6">
                      Please contact the donor to arrange pickup details. Once you've received the donation, click the
                      button below to confirm.
                    </p>

                    <button
                      onClick={confirmDonation}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center"
                    >
                      <Check className="mr-2 h-5 w-5" />
                      Confirm Donation Received
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h2 className="text-xl font-bold mb-4">No donation details found</h2>
                <p className="text-gray-600 mb-6">
                  Please go back to the available donations page and select a donation.
                </p>
                <button
                  onClick={() => navigate("/receive")}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-xl transition-all"
                >
                  Browse Donations
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default DonorDetails
