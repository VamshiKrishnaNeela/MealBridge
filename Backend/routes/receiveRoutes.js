const express = require("express")
const router = express.Router()
const {
  reserveDonation,
  confirmDonationReceived,
  getUserReceivedDonations,
  cancelReservation,
} = require("../controllers/receiveController")
const { protect } = require("../middleware/authMiddleware")

// All routes are protected
router.post("/reserve/:id", protect, reserveDonation)
router.post("/confirm/:id", protect, confirmDonationReceived)
router.get("/user", protect, getUserReceivedDonations)
router.put("/cancel/:id", protect, cancelReservation)

module.exports = router
