const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const BrandSchema = new mongoose.Schema({
  brandId: {
    type: String,
    default: () => uuidv4(), 
    unique: true,          
  },
  brandName: {
    type: String,
  },

});

const PerksDocument = mongoose.model("brand", BrandSchema);

module.exports = PerksDocument;
