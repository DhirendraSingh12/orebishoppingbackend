const ContactModel = require("../models/ContactModel");
exports.contactMessage = async (req, res) => {
  try {
    const { fullname, message, email } = req.body;

    const contact = new ContactModel({
      fullname,
      message,
      email,
    });
    await contact.save();
    res.status(201).json({
      message: "Send Message  successfully",
      document: contact,
    });
  } catch (error) {
    console.error("Error creating document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
