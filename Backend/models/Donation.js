const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donorName: {
      type: String,
      required: true,
    },
    donorEmail: {
      type: String,
      required: true,
    },
    feedablePeople: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    foodDetails: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["available", "reserved", "completed"],
      default: "available",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    receiverName: {
      type: String,
      default: "",
    },
    receiverEmail: {
      type: String,
      default: "",
    },
    receiverContact: {
      type: String,
      default: "",
    },
    receiverPhoto: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

const Donation = mongoose.model("Donation", donationSchema)

module.exports = Donation
