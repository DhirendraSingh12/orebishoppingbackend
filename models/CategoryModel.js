const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const DocumentSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    default: null,
  },
});

DocumentSchema.pre('save', async function (next) {
  if (!this.categoryId) {
    this.categoryId = uuidv4();
  }
  next();
});

const PerksDocument = mongoose.model("category", DocumentSchema);

module.exports = PerksDocument;
