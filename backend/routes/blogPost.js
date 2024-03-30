const express = require("express");

const {
    createBlog,
    getAllBlogs,
    returnCount,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/create", createBlog);
router.get("/all", getAllBlogs);
router.get("/count", returnCount);
module.exports = router;
