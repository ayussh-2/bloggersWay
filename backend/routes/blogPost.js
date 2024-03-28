const express = require("express");

const { createBlog, getAllBlogs } = require("../controllers/blogController");

const router = express.Router();

router.post("/create", createBlog);
router.get("/all", getAllBlogs);

module.exports = router;
