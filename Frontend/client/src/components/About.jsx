import Navbar from "./Navbar"
import Footer from "./Footer"
import { Users, Heart, TrendingUp } from "lucide-react"

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-orange-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-orange-500">About</span> <span className="text-green-700">FoodForward</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              We're on a mission to reduce food waste and fight hunger by connecting those with excess food to those who
              need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Our story"
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                FoodForward was founded in 2023 with a simple idea: create a platform that makes it easy to connect
                excess food with people who need it.
              </p>
              <p className="text-gray-700 mb-4">
                We noticed that while many restaurants, event venues, and individuals often have leftover food that goes
                to waste, there are also many people in our communities who don't have enough to eat.
              </p>
              <p className="text-gray-700">
                Our platform bridges this gap, making it simple for donors to list their excess food and for recipients
                to find available donations nearby.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-4 text-white">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Compassion</h3>
              <p className="text-gray-600">
                We believe that everyone deserves access to nutritious food, and we're committed to making that a
                reality.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mb-4 text-white">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">
                We're building a community of donors and recipients who care about reducing food waste and fighting
                hunger.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-4 text-white">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                By reducing food waste, we're not only helping people but also contributing to a more sustainable
                planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div
                key={member}
                className="bg-beige-50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <img
                  src={`/placeholder.svg?height=300&width=300&text=Team Member ${member}`}
                  alt={`Team member ${member}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Team Member {member}</h3>
                  <p className="text-gray-600 mb-4">Co-Founder</p>
                  <p className="text-gray-700">
                    Passionate about reducing food waste and fighting hunger in our communities.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a restaurant with leftover food, an event organizer, or someone who wants to help, there's a
            place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-full text-lg font-semibold transition-all"
            >
              Sign Up Now
            </a>
            <a
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About