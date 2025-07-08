const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

const allowedOrigins = [
  // process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000", // ✅ Add this
];



app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true); // origin allowed
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Also update preflight OPTIONS request
app.options("*", cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));



// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ App is listening on PORT: ${port}`);
  console.log("✅ Allowed CORS Origins:", allowedOrigins);
});


