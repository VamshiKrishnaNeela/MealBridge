import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Check, ArrowLeft } from "lucide-react"

export default function Postreceive() {
  return (
    <div className="min-h-screen flex flex-col bg-beige-50">
      <Navbar />

      <div className="pt-24 pb-16 flex-grow flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 py-8 px-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-white">Confirm Donation</h1>
              <p className="text-green-100 mt-2">Are you sure you want to receive this food donation?</p>
            </div>

            <div className="p-8">
              <p className="text-gray-600 mb-8 text-center">
                By confirming, you agree to pick up the food at the specified location. The donor will be notified of
                your interest.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/confirmation"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 flex-1 text-center flex items-center justify-center"
                >
                  <Check className="mr-2 h-5 w-5" />
                  Confirm Receipt
                </Link>

                <Link
                  to="/receive"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex-1 text-center flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Go Back
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">FF</span>
                  </div>
                  <span className="text-lg font-bold">
                    <span className="text-orange-500">Food</span>
                    <span className="text-green-700">Forward</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}