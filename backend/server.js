require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const userAuthRoutes = require("./routes/userAuth");
const blogPostRoutes = require("./routes/blogPost");
app.use(express.json());
app.use(cors());
app.use("/api/users", userAuthRoutes);
app.use("/api/blogs", blogPostRoutes);

app.get("/", (req, res) => {
    res.json({ msg: "Hello from backend" });
});

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (err) {
        console.log("MongoDB connection error:", err);
    }
};

connectDB();

// Only start the server if we're not in a Vercel serverless environment
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
}

// Export the Express app for Vercel
module.exports = app;
