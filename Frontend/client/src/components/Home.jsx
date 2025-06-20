import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MainImage from "../assets/MainImage.jpg";
import { AuthContext } from "../context/AuthContext";
import { ArrowRight, Heart, Users, Clock, MapPin } from "lucide-react";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-green-50 -z-10"></div>
        <div className="container mx-auto px-4 py-16 lg:py-32 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-green-700">You can be</span> <br />
              <span className="text-orange-500">the bridge</span> <br />
              <span className="text-green-700">between the two.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Together, we can fight hunger. Connect excess food with those who
              need it most through our simple donation platform.
            </p>

            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/donate"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  Donate Now <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link
                  to="/receive"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  Find Food <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 max-w-md">
                <p className="text-gray-700 mb-4">
                  <span className="text-orange-500 font-semibold">
                    Please login or sign up
                  </span>{" "}
                  to access donation and receive forms.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/signin"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition-all text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={MainImage}
              alt="Food donation illustration"
              className="rounded-2xl shadow-xl max-w-full "
              style={{height:"400px"}}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect excess food with those who
              need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-orange-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-4 text-white">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Register</h3>
              <p className="text-gray-600">
                Create an account to start donating or receiving food.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mb-4 text-white">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Donate Food</h3>
              <p className="text-gray-600">
                List your excess food with details about quantity and pickup
                location.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-4 text-white">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Find Food</h3>
              <p className="text-gray-600">
                Browse available donations near you and request pickup.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mb-4 text-white">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect</h3>
              <p className="text-gray-600">
                Coordinate pickup details and help reduce food waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Together, we're making a difference in our communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <h3 className="text-4xl font-bold text-orange-500 mb-2">
                5,000+
              </h3>
              <p className="text-gray-700">Meals Donated</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <h3 className="text-4xl font-bold text-green-600 mb-2">200+</h3>
              <p className="text-gray-700">Active Donors</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <h3 className="text-4xl font-bold text-orange-500 mb-2">50+</h3>
              <p className="text-gray-700">Partner NGOs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of food donors and recipients today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full text-lg font-semibold transition-all"
            >
              Donate Food
            </Link>
            <Link
              to="/receive"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all"
            >
              Find Food
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
