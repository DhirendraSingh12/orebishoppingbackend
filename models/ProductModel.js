const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const PartSchema = new mongoose.Schema({
  partName: String,
  price: Number,
  image: String,
});
const DocumentSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      default: () => uuidv4(), // Call uuidv4 correctly
      unique: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productBrand: {
      type: String,
      required: true,
      trim: true,
    },
    productPrice: {
      type: String,
      required: true,
      trim: true,
    },
    productCategory: {
      type: String,
      required: true,
      trim: true,
    },
    uploadDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
    status: {
      type: Boolean,
      default: false,
    },
    parts: [
      PartSchema
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductData", DocumentSchema);
