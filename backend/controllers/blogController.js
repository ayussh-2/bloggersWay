const blog = require("../models/blogModel");
const createBlog = async (req, res) => {
    const {
        uid,
        author,
        title,
        locations,
        cover,
        multiImage,
        hotspots,
        route,
        about,
        stories,
    } = req.body;
    try {
        const data = await blog.createBlog(
            uid,
            author,
            title,
            locations,
            cover,
            multiImage,
            hotspots,
            route,
            about,
            stories
        );
        res.status(200).json({ msg: "Blog created successfully", author, uid });
    } catch (err) {
        res.status(400).json({ msg: err });
        console.log(err);
    }
};

const getAllBlogs = async (req, res) => {
    const { page, blogPerPage } = req.query;
    try {
        const blogs = await blog.getBlogs(page, blogPerPage);
        res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { createBlog, getAllBlogs };
