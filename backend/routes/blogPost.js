const express = require("express");

const {
    createBlog,
    getAllBlogs,
    returnCount,
    blogFind,
    getBlogsByUser,
    deleteBlogById,
    updateBlogById,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/create", createBlog);
router.get("/all", getAllBlogs);
router.get("/count", returnCount);
router.get("/getBlogById", blogFind);
router.get("/getBlogByUser", getBlogsByUser);
router.delete("/deleteBlogById", deleteBlogById);
router.patch("/updateBlogById", updateBlogById);
module.exports = router;
