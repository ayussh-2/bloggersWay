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
        cityAndCountry,
        weather,
        avgTemp,
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
            stories,
            cityAndCountry,
            weather,
            avgTemp
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

const returnCount = async (req, res) => {
    try {
        const count = await blog.getCount();
        res.status(200).json({ count: count });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};

const blogFind = async (req, res) => {
    const { bid } = req.query;

    try {
        const result = await blog.getBlogById(bid);
        res.status(200).json({ blog: result });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};

module.exports = { createBlog, getAllBlogs, returnCount, blogFind };
