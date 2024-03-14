import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//  @desc   Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  } else {
    const user = await User.create({ name, email, password });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }

  res.send("auth users");
});

// @desc   Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out sucessfully" });
});

//  @desc   Login user & get token
// @route   Get /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//  @desc   Get user profile
// @route   Get /api/users/:id
// @access  Private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get  user by id");
});

//  @desc   get user profile throught token
// @route   put /api/users/
// @access  Private/admin
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  // Assuming req.user contains information about the currently logged-in user
  const loggedInUserId = req.user._id;
  const users = await User.find({ _id: { $ne: loggedInUserId } }).select(["-password"]);

  res.status(200).json(users);
});

export { loginUser, logoutUser, registerUser, getAllUsers };
