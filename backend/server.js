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
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Db connected");
    })
    .catch((err) => {
        console.log(err);
    });
app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
});
