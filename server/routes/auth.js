const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

/* configuration multer for file upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* User Register */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    //from form fetch all info
    const { firstName, lastName, email, password } = req.body;

    //the uploaded file is overtake as req.file
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }
    /*path to the uploaded profile photo*/
    const profileImagePath = profileImage.path;
    // const profileImagePath = `/uploads/${req.file.filename}`;
    // const profileImagePath = `/uploads/${profileImage.filename}`;

    /* check if user exists */
    const existingUser = await User.findOne({ email });
    console.log("user already exists", existingUser);

    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    /*Hash password */
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    /*create new user */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      profileImagePath,
    });
    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password: inputPassword } = req.body;
    console.log("Request body:", req.body);
    const user = await User.findOne({ email });
    console.log("Searching for user with email:", email);
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(inputPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    /*Generate JWT Token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // delete user.password;
    console.log(token, "token");
    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
