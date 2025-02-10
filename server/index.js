const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing");
const bookingRoutes = require("./routes/booking");
const userRoutes = require("./routes/user");

app.use(
  cors({
    origin: "https://client-rental-app.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
// app.use("/uploads", express.static("public/uploads"));
// const path = require("path");
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

//MONGOOSE SETUP
const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "rental_app",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
