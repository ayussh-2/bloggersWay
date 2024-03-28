const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    uid: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, requird: true },
    locations: { type: String, requird: true },
    imgs: { type: String },
    hotspots: { type: String },
    route: { type: String, requird: true },
    about: { type: String, requird: true },
    stories: { type: String },
});

blogSchema.statics.createBlog = async function (
    uid,
    author,
    title,
    locations,
    imgs,
    hotspots,
    route,
    about,
    stories
) {
    const blogPost = await this.create({
        uid,
        author,
        title,
        locations,
        imgs,
        hotspots,
        route,
        about,
        stories,
    });
    return blogPost;
};
blogSchema.statics.getBlogs = async function (page, blogPerPage) {
    const blogs = this.find()
        .skip(blogPerPage * page)
        .limit(blogPerPage);
    return blogs;
};

module.exports = mongoose.model("blog", blogSchema);
