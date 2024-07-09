import { User } from "../Models/user.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import createToken from "../Utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError("User already exists");
  }

  const newUser = new User({ username, email, password });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json(
      new ApiResponse(
        200,
        {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
        },
        "User registered Successfully"
      )
    );
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (isPasswordValid) {
      createToken(res, user._id);

      res.status(201).json(
        new ApiResponse(
          200,
          {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          "user successfully login"
        )
      );
    } else {
      res.status(401);
      throw new Error(401, "Invalid credentials");
    }
  } else {
    res.status(401);
    throw new Error(401, "User not found");
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json(new ApiResponse(201, "Successfully logged out"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res
    .status(200)
    .json(new ApiResponse(200, users, "Success fetch user details"));
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json(new ApiResponse(200, user, "Success fetch"));
  } else {
    res.status(404);
    throw new ApiError(404, "User not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json(
      new ApiResponse(
        201,
        {
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
        },
        "user updated successfully"
      )
    );
  } else {
    res.status(404);
    throw new ApiError(404, "User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};
