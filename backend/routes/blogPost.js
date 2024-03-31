const express = require("express");

const {
    createBlog,
    getAllBlogs,
    returnCount,
    blogFind,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/create", createBlog);
router.get("/all", getAllBlogs);
router.get("/count", returnCount);
router.get("/getBlogById", blogFind);
module.exports = router;
