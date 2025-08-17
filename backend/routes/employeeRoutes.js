const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { createEmployee, getEmployees, deleteEmployee, getStats } = require("../controllers/employeeController");

router.get("/stats", protect, getStats);
router.get("/", protect, getEmployees);
router.post("/", protect, createEmployee);
router.delete("/:id", protect, deleteEmployee);

module.exports = router;
