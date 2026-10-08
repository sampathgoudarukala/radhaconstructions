const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    projectType: {
      type: String,
      required: true,
      trim: true,
    },

    plotSize: {
      type: String,
      trim: true,
    },

    builtUpArea: {
      type: String,
      trim: true,
    },

    floors: {
      type: String,
      trim: true,
    },

    budget: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    files: [
      {
        name: {
          type: String,
          trim: true,
        },

        url: {
          type: String,
          trim: true,
        },

        type: {
          type: String,
          trim: true,
        },

        size: {
          type: Number,
        },
      },
    ],

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "In Discussion",
        "Estimate",
        "Approved",
        "Rejected",
        "Completed",
      ],
      default: "New",
    },
    internalNotes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);