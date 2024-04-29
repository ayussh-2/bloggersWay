const express = require("express");

const {
    createBlog,
    getAllBlogs,
    returnCount,
    blogFind,
    getBlogsByUser,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/create", createBlog);
router.get("/all", getAllBlogs);
router.get("/count", returnCount);
router.get("/getBlogById", blogFind);
router.get("/getBlogByUser", getBlogsByUser);
module.exports = router;
