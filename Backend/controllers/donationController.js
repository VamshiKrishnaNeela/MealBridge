const Donation = require("../models/Donation")


// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private
const createDonation = async (req, res) => {
  try {
    const { donorName, donorEmail, feedablePeople, location, contact, foodDetails, imageUrl } = req.body


    // Create new donation
    const donation = await Donation.create({
      donorId: req.user._id,
      donorName,
      donorEmail,
      feedablePeople,
      location,
      contact,
      foodDetails,
      imageUrl,
    })

    res.status(201).json(donation)
  } catch (error) {
    console.error("Create donation error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @desc    Get all available donations
// @route   GET /api/donations
// @access  Public
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ status: "available" }).sort({ createdAt: -1 })
    res.json(donations)
  } catch (error) {
    console.error("Get donations error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @desc    Get donation by ID
// @route   GET /api/donations/:id
// @access  Public
const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)

    if (donation) {
      res.json(donation)
    } else {
      res.status(404).json({ message: "Donation not found" })
    }
  } catch (error) {
    console.error("Get donation by ID error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @desc    Get donations by user
// @route   GET /api/donations/user
// @access  Private
const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id }).sort({ createdAt: -1 })
    res.json(donations)
  } catch (error) {
    console.error("Get user donations error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @desc    Update donation status
// @route   PUT /api/donations/:id
// @access  Private
const updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body

    const donation = await Donation.findById(req.params.id)

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" })
    }

    // Only allow donor or admin to update status
    if (donation.donorId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this donation" })
    }

    donation.status = status
    const updatedDonation = await donation.save()

    res.json(updatedDonation)
  } catch (error) {
    console.error("Update donation status error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// @desc    Delete donation
// @route   DELETE /api/donations/:id
// @access  Private
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" })
    }

    // Only allow donor or admin to delete
    if (donation.donorId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this donation" })
    }

    await donation.remove()

    res.json({ message: "Donation removed" })
  } catch (error) {
    console.error("Delete donation error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

module.exports = {
  createDonation,
  getDonations,
  getDonationById,
  getUserDonations,
  updateDonationStatus,
  deleteDonation,
}
