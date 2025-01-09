const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const employeeSchema = new Schema(
  {
    userId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalcode: { type: String, required: true },
  },
  { timestamps: true }
);

const Employee = mongoose.model("UserRegister", employeeSchema);
module.exports = Employee;
