import bcrypt from "bcrypt";
import { generateToken } from "../utilis/generatetoken.js";
import { User } from "../models/usermodel.js";

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Validation
    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Username already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword
    });

    // Generate JWT Token
    const token = generateToken(newUser._id);

    // Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email
      },
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required!" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      "sahibdeep",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

