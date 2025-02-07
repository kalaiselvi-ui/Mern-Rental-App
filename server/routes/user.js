const router = require("express").Router();

const { default: mongoose } = require("mongoose");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");

//trip list
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(trips);
    // const uniqueTrips = Object.values(
    //   trips.reduce((acc, trip) => {
    //     acc[trip.listingId._id] = trip;
    //   }, {})
    // );
    // res.status(200).json(uniqueTrips);
    // console.log(trips);
  } catch (err) {
    console.log(404).json({ message: "Can not find trip", error: err.message });
  }
});

module.exports = router;

//Add listing to wishlist
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    console.log("📌 PATCH request received");

    const { userId, listingId } = req.params;
    console.log("📌 userId:", userId, "listingId:", listingId);

    // Validate ObjectId format before querying
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(listingId)
    ) {
      console.log("❌ Invalid userId or listingId");
      return res.status(400).json({ message: "Invalid User ID or Listing ID" });
    }

    // Populate `wishList` to ensure it contains ObjectIds
    const user = await User.findById(userId).populate("wishList");
    if (!user) {
      console.log("❌ User not found in database");
      return res.status(404).json({ message: "User not found" });
    }
    console.log("✅ User found:", user._id);
    console.log("📌 user.wishList:", user.wishList);

    const listing = await Listing.findById(listingId).populate("creator");
    if (!listing) {
      console.log("❌ Listing not found");
      return res.status(404).json({ message: "Listing not found" });
    }
    console.log("✅ Listing found:", listing._id);

    // Convert `wishList` items to ObjectIds before searching
    const favoriteListing = user.wishList.find((item) => {
      if (typeof item === "string") {
        return item === listingId;
      }
      return item?._id?.toString() === listingId;
    });
    console.log("🔍 Favorite Listing Exists?", favoriteListing);

    if (favoriteListing) {
      console.log("🔴 Removing listing from wishlist...");
      user.wishList = user.wishList.filter(
        (item) => item?._id?.toString() !== listingId
      );
    } else {
      console.log("🟢 Adding listing to wishlist...");
      user.wishList.push(listing);
    }

    await user.save();
    console.log("✅ Wishlist updated:", user.wishList);

    res.status(200).json({
      message: favoriteListing
        ? "Listing removed from wishlist"
        : "Listing added to wishlist",
      wishList: user.wishList,
    });
  } catch (err) {
    console.error("❌ Error in PATCH request:", err);
    res.status(500).json({ error: err.message });
  }
});

//property list
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ message: "Invalid user ID" });
    // }

    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(202).json(properties);
  } catch (err) {
    console
      .log(404)
      .json({ message: "Can not find properties", error: err.message });
  }
});

//reservation list
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(reservations);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find reservations!", error: err.message });
  }
});
