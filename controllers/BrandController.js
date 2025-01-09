const BrandModel = require("../models/BrandModel");
exports.BrandDocument = async (req, res) => {
  try {
    const { brandName } = req.body;
    const categorDocument = new BrandModel({
      brandName,
    });
    await categorDocument.save();
    res.status(201).json({
      message: "Document created successfully",
      document: categorDocument,
    });
  } catch (error) {
    console.error("Error creating document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

exports.BrandDocumentEdite = async (req, res) => {
  try {
    const { brandId } = req.params;
    const { brandName } = req.body;
    const categorDocument = await BrandModel.findOneAndUpdate({ brandId });
    categorDocument.brandName = brandName || categorDocument.brandName;

    await categorDocument.save();
    res.status(200).json({
      message: "Document updated successfully",
      document: categorDocument,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

exports.getAllBrandDocument = async (req, res) => {
  try {
    const categorDocument = await BrandModel.find();
    res.status(200).json({
      message: "Documents fetched successfully",
      categorDocument,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

exports.deleteBrandDocument = async (req, res) => {
  try {
    const { brandId } = req.params;
    await BrandModel.findOneAndDelete({ brandId });
    res.status(200).json({ message: "Perks  deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

exports.getBrandDocumentById = async (req, res) => {
  try {
    const { brandId } = req.params;
    const categorDocument = await BrandModel.findOne({ brandId });
    res.status(200).json({
      message: "Document  fetched By Id successfully",
      document: categorDocument,
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};
