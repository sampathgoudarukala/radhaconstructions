const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const enquiryRoutes = require("./routes/enquiryRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "upload/files"))
);

// API Routes
app.use("/api/enquiries", enquiryRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Radha Constructions API is running",
  });
});

// Start server
// app.listen(PORT, () => {
//   console.log(`Radha Constructions API running on port ${PORT}`);
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Radha Constructions API running on port ${PORT}`);
});