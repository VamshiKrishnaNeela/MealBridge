const Donation = require("../models/Donation")
const User = require("../models/User")


// @desc    Reserve a donation
// @route   POST /api/receive/reserve/:id
// @access  Private
const reserveDonation = async (req, res) => {
  try {
    const donationId = req.params.id

    const donation = await Donation.findById(donationId)

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" })
    }

    if (donation.status !== "available") {
      return res.status(400).json({ message: "This donation is no longer available" })
    }

    // Update donation status to reserved
    donation.status = "reserved"
    donation.receiverId = req.user._id
    donation.receiverName = req.user.name
    donation.receiverEmail = req.user.email

    const updatedDonation = await donation.save()

    res.json(updatedDonation)
  } catch (error) {
    console.error("Reserve donation error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @desc    Confirm donation received
// @route   POST /api/receive/confirm/:id
// @access  Private
const confirmDonationReceived = async (req, res) => {
  try {
    const donationId = req.params.id
    const { receiverContact, receiverPhotoUrl } = req.body

    const donation = await Donation.findById(donationId)

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" })
    }

    if (donation.status !== "reserved") {
      return res.status(400).json({ message: "This donation is not reserved" })
    }

    // Only allow the receiver to confirm
    if (donation.receiverId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to confirm this donation" })
    }




    // Update donation status to completed
    donation.status = "completed"
    donation.receiverContact = receiverContact || ""
    donation.receiverPhoto = receiverPhotoUrl

    const updatedDonation = await donation.save()

    res.json(updatedDonation)
  } catch (error) {
    console.error("Confirm donation error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @desc    Get user's received donations
// @route   GET /api/receive/user
// @access  Private
const getUserReceivedDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      receiverId: req.user._id,
      status: { $in: ["reserved", "completed"] },
    }).sort({ updatedAt: -1 })

    res.json(donations)
  } catch (error) {
    console.error("Get received donations error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @desc    Cancel reservation
// @route   PUT /api/receive/cancel/:id
// @access  Private
const cancelReservation = async (req, res) => {
  try {
    const donationId = req.params.id

    const donation = await Donation.findById(donationId)

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" })
    }

    if (donation.status !== "reserved") {
      return res.status(400).json({ message: "This donation is not reserved" })
    }

    // Only allow the receiver to cancel
    if (donation.receiverId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this reservation" })
    }

    // Reset donation to available
    donation.status = "available"
    donation.receiverId = null
    donation.receiverName = ""
    donation.receiverEmail = ""

    const updatedDonation = await donation.save()

    res.json(updatedDonation)
  } catch (error) {
    console.error("Cancel reservation error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

module.exports = {
  reserveDonation,
  confirmDonationReceived,
  getUserReceivedDonations,
  cancelReservation,
}
