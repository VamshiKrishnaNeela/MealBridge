const express = require("express")
const router = express.Router()
const {
  createDonation,
  getDonations,
  getDonationById,
  getUserDonations,
  updateDonationStatus,
  deleteDonation,
} = require("../controllers/donationController")
const { protect, admin } = require("../middleware/authMiddleware")

// Public routes
router.get("/", getDonations)
router.get("/:id", getDonationById)

// Protected routes
router.post("/", protect, createDonation)
router.get("/user/donations", protect, getUserDonations)
router.route("/:id").put(protect, updateDonationStatus).delete(protect, deleteDonation)

module.exports = router
