import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Home from "./components/Home"
import About from "./components/About"
import DonateForm from "./components/DonateForm"
import Receive from "./components/Receive"
import SigninForm from "./components/SigninForm"
import SignupForm from "./components/SignupForm"
import DonorDetails from "./components/DonorDetails"
import Postreceive from "./components/Postreceive"
import Success from "./components/Success"
import Contact from "./components/Contact"
import Dashboard from "./components/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import './index.css'


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col font-nunito bg-beige-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SigninForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/receive" element={<Receive />} />
            <Route path="/details/:id" element={<DonorDetails />} />

            {/* Protected routes */}
            <Route
              path="/donate"
              element={
                <PrivateRoute>
                  <DonateForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/postreceive"
              element={
                <PrivateRoute>
                  <Postreceive />
                </PrivateRoute>
              }
            />
            <Route
              path="/success"
              element={
                <PrivateRoute>
                  <Success />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
