const userService = require("../services/userServices");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";
const Employee = require('../models/EmployeeModel')
const bcrypt = require("bcrypt");


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email); 
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const { user: authenticatedUser, token } = await userService.authenticateUser(email, password);

    res.status(200).json({
      message: "Login successful",
      user: authenticatedUser,
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};


exports.SuperAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const SUPER_ADMIN_EMAIL = "superadmin@gmail.com";
    const SUPER_ADMIN_PASSWORD = "superadmin";
    if (email !== SUPER_ADMIN_EMAIL || password !== SUPER_ADMIN_PASSWORD) {
      return res
        .status(403)
        .json({ error: "Access denied. Invalid credentials." });
    }
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json({
      message: "Super Admin login successful",
      jwtToken: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};
exports.AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const SUPER_ADMIN_EMAIL = "admin@gmail.com";
    const SUPER_ADMIN_PASSWORD = "admin@123";
    if (email !== SUPER_ADMIN_EMAIL || password !== SUPER_ADMIN_PASSWORD) {
      return res
        .status(403)
        .json({ error: "Access denied. Invalid credentials." });
    }
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json({
      message: " Admin login successful",
      jwtToken: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};
