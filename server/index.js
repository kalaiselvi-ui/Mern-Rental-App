const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

app.use("/uploads", express.static("public/uploads"));
const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing");
const bookingRoutes = require("./routes/booking");
const userRoutes = require("./routes/user");

// CORS Setup
const corsOptions = {
  origin: (origin, callback) => {
    // Allow both the client app on Vercel and localhost for testing
    if (
      origin === "https://client-rental-app.vercel.app" ||
      origin === "http://localhost:5173"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authentication headers
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // To handle preflight 204 issue
};

app.use(cors(corsOptions)); // Apply CORS globally

// Preflight request handling
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin); // Allow origin dynamically
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200); // Successful preflight response
  }
  next();
});

// Body Parsing
app.use(express.json()); // Enable parsing of JSON requests

// Routes
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// Mongoose setup and server start
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "rental_app",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, () => console.log("Server is running on port 3001"));
  })
  .catch((err) => console.log(`Error: ${err}`));
