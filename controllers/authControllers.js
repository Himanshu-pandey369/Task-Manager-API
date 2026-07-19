import bcrypt from "bcrypt";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    if (name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 3 characters long.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please log in.",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    const token = newUser.generateToken();

    return res.status(201).json({
      success: true,
      token,
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = existingUser.generateToken();

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
