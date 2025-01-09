const userService = require("../services/userServices");
const mongoose = require("mongoose");
const Employee = require("../models/EmployeeModel");
const bcrypt = require("bcrypt");

exports.CreateEmployee = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      password,
      address,
      city,
      country,
      postalcode,
    } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !address || !city || !country || !postalcode) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already registered with this email" });
    }

    const newUser = new Employee({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
      city,
      country,
      postalcode,
    });
    await newUser.save();

    res.status(201).json({
      message: "User Register successfully ",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: error.message || "An unexpected error occurred",
    });
  }
};
exports.getAllEmployee = async (req, res) => {
  try {
    const users = await userService.findAllUsers();

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
exports.deleteEmployee = async (req, res) => {
  const { userId } = req.params;
  try {
    await userService.findUserByEmployeeId(userId);
    await userService.deleteUserByEmployeeId(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
exports.getEmployeeUserById = async (req, res) => {
  try {
    console.log(req.params);
    const { userId } = req.params;
    const user = await userService.findUserByEmployeeId(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

exports.updateEmployee = async (req, res) => {
  const { userId } = req.params;
  const userDetails = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, userDetails);
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
