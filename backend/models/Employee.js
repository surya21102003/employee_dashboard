const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  role: { type: String, default: "Employee" },
  department: String,
  status: { type: String, enum: ["Active","Inactive"], default: "Active" },
  activeTasks: { type: Number, default: 0 },
  isIntern: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
