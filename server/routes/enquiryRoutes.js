const express = require("express");
const Enquiry = require("../models/Enquiry");
const upload = require("../upload/upload");

const router = express.Router();


// ========================================
// POST - Create new enquiry with files
// ========================================

router.post("/", upload.array("files", 10), async (req, res) => {
  try {
    const enquiryData = {
      ...req.body,

      files: (req.files || []).map((file) => ({
        name: file.originalname,
        url: `/uploads/${file.filename}`,
        type: file.mimetype,
        size: file.size,
      })),
    };

    const enquiry = await Enquiry.create(enquiryData);

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Enquiry creation error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to submit enquiry",
    });
  }
});


// ========================================
// GET - Get all enquiries
// ========================================

router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error(
      "Enquiries fetch error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch enquiries",
    });
  }
});


// ========================================
// GET - Get single enquiry
// ========================================

router.get("/:id", async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      enquiry,
    });
  } catch (error) {
    console.error(
      "Single enquiry fetch error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch enquiry",
    });
  }
});


// ========================================
// PATCH - Update enquiry status
// ========================================

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Contacted",
      "In Discussion",
      "Estimate",
      "Approved",
      "Rejected",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status",
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry status updated successfully",
      enquiry,
    });
  } catch (error) {
    console.error(
      "Enquiry status update error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to update enquiry status",
    });
  }
});

// PATCH - Update internal enquiry notes
router.patch("/:id/notes", async (req, res) => {
  try {
    const { internalNotes } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      {
        internalNotes: internalNotes || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internal notes updated successfully",
      enquiry,
    });
  } catch (error) {
    console.error(
      "Internal notes update error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Unable to update internal notes",
    });
  }
});
module.exports = router;