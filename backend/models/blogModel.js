const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    uid: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, requird: true },
    locations: { type: String, requird: true },
    cover: { type: String },
    multiImage: { type: Array },
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
    cover,
    multiImage,
    hotspots,
    route,
    about,
    stories
) {
    try {
        const blogPost = await this.create({
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
        });
        return blogPost;
    } catch (err) {
        return err;
    }
};
blogSchema.statics.getBlogs = async function (page, blogPerPage) {
    const blogs = this.find()
        .skip((page - 1) * blogPerPage)
        .limit(blogPerPage);

    return blogs;
};

module.exports = mongoose.model("blog", blogSchema);
