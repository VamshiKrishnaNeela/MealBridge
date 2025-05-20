"use client"

import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { AuthContext } from "../context/AuthContext"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Upload, MapPin, Users, Info } from "lucide-react"
import * as api from "../api"

export default function DonateForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()
  const [imageBase64, setImageBase64] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const { user } = useContext(AuthContext)

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setImageBase64(base64)
  }

  const formSubmitHandler = async (data) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      const donationData = {
        donorName: data.Donor_Name,
        donorEmail: data.Donor_Email,
        feedablePeople: data.Feedable_people,
        location: data.Location,
        contact: data.Contact,
        foodDetails: data.Food_details,
        imageBase64: imageBase64,
      }

      await api.createDonation(donationData)

      reset()
      setImageBase64("")
    } catch (err) {
      console.log("Error submitting form:", err)
      setSubmitError(err.response?.data?.message || "Failed to submit donation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-beige-50">
      <Navbar />

      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Form information */}
              <div className="md:w-1/3 bg-gradient-to-b from-orange-500 to-orange-600 text-white p-8">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-orange-500 font-bold text-lg">FF</span>
                  </div>
                  <span className="text-xl font-bold">FoodForward</span>
                </div>

                <h2 className="text-2xl font-bold mb-6">Donate Food</h2>
                <p className="mb-8">
                  Your donation can make a big difference in someone's life. Fill out the form to share your excess food
                  with those who need it.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-white" />
                    <span>Help feed people in need</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-white" />
                    <span>Connect with local recipients</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-white" />
                    <span>Reduce food waste</span>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="md:w-2/3 p-8">
                <h1 className="text-2xl font-bold mb-6">Donation Details</h1>

                {isSubmitSuccessful && (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6">
                    <h2 className="font-bold">Thank you for your donation!</h2>
                    <p>Your generosity will help those in need.</p>
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
                    <h2 className="font-bold">Error</h2>
                    <p>{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(formSubmitHandler)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          className={`w-full px-4 py-3 rounded-xl border ${errors.Donor_Name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                          placeholder="Name of the Donor"
                          defaultValue={user?.name || ""}
                          {...register("Donor_Name", {
                            required: "Please enter the name of the donor",
                          })}
                        />
                        {errors.Donor_Name && <p className="text-red-500 text-sm mt-1">{errors.Donor_Name.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Your Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          className={`w-full px-4 py-3 rounded-xl border ${errors.Donor_Email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                          placeholder="Email of Donor"
                          defaultValue={user?.email || ""}
                          {...register("Donor_Email", {
                            required: "Please enter the Email of the donor",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.Donor_Email && (
                          <p className="text-red-500 text-sm mt-1">{errors.Donor_Email.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Feedable People</label>
                    <div className="relative">
                      <input
                        type="number"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.Feedable_people ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        placeholder="Number of Feedable People"
                        {...register("Feedable_people", {
                          required: "Please enter the approximate number of people that can be fed with your food",
                        })}
                      />
                      {errors.Feedable_people && (
                        <p className="text-red-500 text-sm mt-1">{errors.Feedable_people.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.Location ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        placeholder="Location where the food is to be collected"
                        {...register("Location", {
                          required: "Please enter the location where the food should be collected",
                        })}
                      />
                      {errors.Location && <p className="text-red-500 text-sm mt-1">{errors.Location.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.Contact ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        placeholder="Contact Number of Donor"
                        {...register("Contact", {
                          required: "Please enter the Contact Details",
                        })}
                      />
                      {errors.Contact && <p className="text-red-500 text-sm mt-1">{errors.Contact.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Food Details</label>
                    <div className="relative">
                      <textarea
                        className={`w-full px-4 py-3 rounded-xl border ${errors.Food_details ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        placeholder="Types of food"
                        rows="3"
                        {...register("Food_details", {
                          required: "Please enter the types of food",
                        })}
                      ></textarea>
                      {errors.Food_details && (
                        <p className="text-red-500 text-sm mt-1">{errors.Food_details.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Food Photo</label>
                    <div className="relative">
                      <div
                        className={`border-2 border-dashed ${imageBase64 ? "border-green-300 bg-green-50" : "border-gray-300"} rounded-xl p-4 text-center`}
                      >
                        <input
                          type="file"
                          id="file-upload"
                          accept=".jpeg, .png, .jpg"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          <Upload className={`w-8 h-8 ${imageBase64 ? "text-green-500" : "text-gray-400"}`} />
                          <span className="mt-2 text-sm text-gray-500">
                            {imageBase64 ? "Image uploaded successfully!" : "Click to upload a photo of the food"}
                          </span>
                        </label>
                        {imageBase64 && (
                          <div className="mt-4">
                            <img
                              src={imageBase64 || "/placeholder.svg"}
                              alt="Food preview"
                              className="h-40 mx-auto rounded-lg object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Donation"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
