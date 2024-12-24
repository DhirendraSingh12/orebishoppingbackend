const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  
  fullname: {
    type: String,
  },
  message: {
    type: String,
  },

  email: {
    type: String,
  },


});

const PerksDocument = mongoose.model("contact", BrandSchema);

module.exports = PerksDocument;
