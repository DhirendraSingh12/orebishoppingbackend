const helper = require("../utils/helper");
const bcrypt = require("bcrypt");

const User = require('../models/EmployeeModel'); 
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
const jwt = require("jsonwebtoken");
exports.findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    throw new Error(error.message || "Error finding user by email");
  }
};

exports.findAllUsers = async () => {
  try {
    return await User.find(); 
  } catch (error) {
    console.error("Error querying the database:", error);
    throw new Error("Error querying the database"); 
  }
};

exports.createUser = async (userData) => {
  try {
    if (!userData.password || typeof userData.password !== 'string') {
      throw new Error("Invalid or missing password");
    }

    const hashedPassword = await helper.hashPassword(userData.password);
    const user = new User({
      ...userData,
      password: hashedPassword,
    });

    return await user.save();
  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw new Error(error.message || "Error creating user");
  }
};


exports.findUserByEmployeeId = async (userId) => {
  try {
    return await User.findOne({ userId }); 
  } catch (error) {
    console.error("Error in findUserByEmployeeId:", error);
    throw new Error(error.message || "Database error occurred");
  }
};

exports.deleteUserByEmployeeId = async (userId) => {
  try {
    return await User.deleteOne({ userId }); 
  } catch (error) {
    console.error("Error deleting user by employeeId:", error);
    throw new Error(error.message || "Error deleting user");
  }
};

exports.authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });

    // Return user data and token
    return { user, token };
  } catch (error) {
    throw new Error(error.message || "Authentication error");
  }
};


exports.updateUser = async (userId, userDetails) => {
  try {
    return await User.findOneAndUpdate({ userId }, userDetails, { new: true });
  } catch (error) {
    throw new Error(error.message || "Error updating user");
  }
};
