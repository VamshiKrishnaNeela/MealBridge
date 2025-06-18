import { useState, useContext, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const { isAuthenticated, user } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">MB</span>
            </div>
            <span className="text-xl font-bold">
              <span className="text-orange-500">Meal</span>
              <span className="text-green-700">Bridge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { path: "/", label: "Home" },
              { path: "/about", label: "About" },
              { path: "/donate", label: "Donate" },
              { path: "/receive", label: "Find Food" },
              { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${
                  isActive(path)
                    ? "text-orange-500 font-semibold"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {label}
              </Link>
            ))}

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/signin"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 px-4">
            <div className="flex flex-col space-y-4">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                { path: "/donate", label: "Donate" },
                { path: "/receive", label: "Find Food" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`nav-link ${
                    isActive(path)
                      ? "text-orange-500 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={toggleMenu}
                >
                  {label}
                </Link>
              ))}

              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all text-center"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-all text-center"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
