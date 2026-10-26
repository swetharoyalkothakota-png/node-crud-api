require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student and User CRUD API is running!");
});

// Direct test route
app.get("/api/test-direct", (req, res) => {
  res.json({
    success: true,
    message: "Direct route is working!",
  });
});

// Student and User routes
app.use("/api", routes);

console.log("SERVER FILE:", __filename);
console.log("ROUTES TYPE:", typeof routes);

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Server running at http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
}

startServer();
