import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer"
import { Upload, Check, Camera } from "lucide-react"

export default function Success() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const [imageBase64, setImageBase64] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true)

      if (!imageBase64) {
        console.error("Image is required.")
        setIsSubmitting(false)
        return
      }

      const Data = { ...formData, receiverPhoto: imageBase64 }
      const response = await axios.post("https://s53-jahnavesh-capstone-feed-forward.onrender.com/receiveDetails", Data)
      console.log("Success:", response.data)
      navigate("/receive")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-beige-50">
      <Navbar />

      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 py-8 px-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-white">Confirm Receipt</h1>
              <p className="text-green-100 mt-2">Please provide proof of receipt</p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Upload Receiver Photo</label>
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
                        {...register("receiverPhoto", { required: "Receiver photo is required" })}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                        <Upload className={`w-8 h-8 ${imageBase64 ? "text-green-500" : "text-gray-400"}`} />
                        <span className="mt-2 text-sm text-gray-500">
                          {imageBase64 ? "Image uploaded successfully!" : "Click to upload a photo of the receiver"}
                        </span>
                      </label>
                      {imageBase64 && (
                        <div className="mt-4">
                          <img
                            src={imageBase64 || "/placeholder.svg"}
                            alt="Receiver preview"
                            className="h-40 mx-auto rounded-lg object-cover"
                          />
                        </div>
                      )}
                    </div>
                    {errors.receiverPhoto && (
                      <p className="text-red-500 text-sm mt-1">{errors.receiverPhoto.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
                  <input
                    type="tel"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.Contact ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-600`}
                    placeholder="Enter receiver's contact number"
                    {...register("Contact", { required: "Contact number is required" })}
                  />
                  {errors.Contact && <p className="text-red-500 text-sm mt-1">{errors.Contact.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !imageBase64}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Check className="mr-2 h-5 w-5" />
                      Submit Confirmation
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}