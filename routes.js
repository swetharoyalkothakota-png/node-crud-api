
const express = require("express");
const mongoose = require("mongoose");

const Student = require("./models/Student");
const User = require("./models/User");

const router = express.Router();

// TEST API
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GET API is working!",
  });
});

// Validate MongoDB ID
const isValidId = (id) => mongoose.isValidObjectId(id);

// ================= STUDENTS CRUD =================

// CREATE student
router.post("/students", async (req, res) => {
  try {
    const { name, course } = req.body;

    if (!name?.trim() || !course?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and course are required",
      });
    }

    const student = await Student.create({
      name: name.trim(),
      course: course.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// READ all students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// READ one student
router.get("/students/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE student
router.put("/students/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const { name, course } = req.body;

    if (!name?.trim() || !course?.trim()) {
      return res.status(400).json({
        message: "Name and course are required",
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), course: course.trim() },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE student
router.delete("/students/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= USERS CRUD =================

// CREATE user
router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: error.message });
  }
});

// READ all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ one user
router.get("/users/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE user
router.put("/users/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const { name, email } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const duplicateUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.params.id },
    });

    if (duplicateUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), email: normalizedEmail },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: error.message });
  }
});

// DELETE user
router.delete("/users/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
