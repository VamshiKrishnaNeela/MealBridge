"use client"

import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import { Heart, Users, Clock, MapPin, Package, ArrowRight, PieChart, BarChart3, TrendingUp } from "lucide-react"
import * as api from "../api"

function Dashboard() {
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState("donations")
  const [userDonations, setUserDonations] = useState([])
  const [receivedDonations, setReceivedDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true)
      try {
        // Fetch user's donations
        const donationsResponse = await api.getUserDonations()
        setUserDonations(donationsResponse.data)

        // Fetch user's received donations
        const receivedResponse = await api.getUserReceivedDonations()
        setReceivedDonations(receivedResponse.data)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setError(error.response?.data?.message || "Failed to load user data")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-beige-50">
      <Navbar />

      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Dashboard Header */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name || "User"}!</h1>
                  <p className="text-gray-600">Manage your donations and track your impact.</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link
                    to="/donate"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-all inline-flex items-center"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    New Donation
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <Package className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Donations</p>
                    <h3 className="text-2xl font-bold">{userDonations.length}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">People Fed</p>
                    <h3 className="text-2xl font-bold">
                      {userDonations.reduce(
                        (total, donation) => total + Number.parseInt(donation.feedablePeople || 0, 10),
                        0,
                      )}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
              <div className="flex border-b">
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "donations"
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("donations")}
                >
                  My Donations
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "received"
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("received")}
                >
                  Received Donations
                </button>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
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
                    <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
                    <p className="text-gray-500 mb-4">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-all inline-flex items-center"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <>
                    {activeTab === "donations" && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">Your Donations</h2>

                        {userDonations.length === 0 ? (
                          <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No donations yet</h3>
                            <p className="text-gray-500 mb-4">You haven't made any donations yet.</p>
                            <Link
                              to="/donate"
                              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-all inline-flex items-center"
                            >
                              Make Your First Donation
                            </Link>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Location
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Food Details
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Feedable People
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Status
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {userDonations.map((donation) => (
                                  <tr key={donation._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 text-orange-500 mr-2" />
                                        <span className="text-sm font-medium text-gray-900">{donation.location}</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className="text-sm text-gray-500">{donation.foodDetails}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-500">{donation.feedablePeople}</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-500">
                                          {new Date(donation.createdAt).toLocaleDateString()}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          donation.status === "available"
                                            ? "bg-green-100 text-green-800"
                                            : donation.status === "reserved"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : "bg-blue-100 text-blue-800"
                                        }`}
                                      >
                                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <Link
                                        to={`/donations/${donation._id}`}
                                        className="text-orange-500 hover:text-orange-700"
                                      >
                                        View Details
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "received" && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">Received Donations</h2>

                        {receivedDonations.length === 0 ? (
                          <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No received donations</h3>
                            <p className="text-gray-500 mb-4">You haven't received any donations yet.</p>
                            <Link
                              to="/receive"
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition-all inline-flex items-center"
                            >
                              Find Available Donations
                            </Link>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Donor
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Location
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Food Details
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Feedable People
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {receivedDonations.map((donation) => (
                                  <tr key={donation._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className="text-sm font-medium text-gray-900">{donation.donorName}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 text-orange-500 mr-2" />
                                        <span className="text-sm text-gray-500">{donation.location}</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className="text-sm text-gray-500">{donation.foodDetails}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-500">{donation.feedablePeople}</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-500">
                                          {new Date(donation.createdAt).toLocaleDateString()}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          donation.status === "reserved"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-blue-100 text-blue-800"
                                        }`}
                                      >
                                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "analytics" && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">Your Impact Analytics</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-gray-700">Donation History</h3>
                              <PieChart className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="h-64 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-32 h-32 mx-auto rounded-full border-8 border-orange-500 border-t-transparent animate-spin"></div>
                                <p className="mt-4 text-gray-500">Loading chart data...</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-gray-700">People Fed</h3>
                              <BarChart3 className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="h-64 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-32 h-32 mx-auto rounded-full border-8 border-green-600 border-t-transparent animate-spin"></div>
                                <p className="mt-4 text-gray-500">Loading chart data...</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-md p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">Ready to make another donation?</h2>
                  <p className="text-orange-100">Your generosity can make a big difference in someone's life.</p>
                </div>
                <Link
                  to="/donate"
                  className="bg-white text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-full font-semibold transition-all inline-flex items-center"
                >
                  Donate Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
