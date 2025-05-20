const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const userRoutes = require("./routes/userRoutes")
const donationRoutes = require("./routes/donationRoutes")
const receiveRoutes = require("./routes/receiveRoutes")

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: "50mb" })) // Increased limit for image uploads
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/users", userRoutes)
app.use("/api/donations", donationRoutes)
app.use("/api/receive", receiveRoutes)

// Root route
app.get("/", (req, res) => {
  res.send("FoodForward API is running")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
