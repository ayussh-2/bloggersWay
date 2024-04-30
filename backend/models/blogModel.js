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
    cityAndCountry: { type: String },
    weather: { type: String },
    avgTemp: { type: String },
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
    stories,
    cityAndCountry,
    weather,
    avgTemp
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
            cityAndCountry,
            weather,
            avgTemp,
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

blogSchema.statics.getBlogByUser = async function (uid) {
    try {
        const blogs = await this.find({ uid: uid });
        return blogs;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

blogSchema.statics.getCount = async function () {
    try {
        const count = await this.countDocuments({}).exec();
        return count;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

blogSchema.statics.getBlogById = async function (id) {
    try {
        const blog = await this.findById(id);
        if (!blog) {
            return {};
        }
        return blog;
    } catch (err) {
        console.error(err);
        return {};
        // throw err;
    }
};

blogSchema.statics.deleteBlog = async function (id) {
    try {
        const blog = await this.deleteOne({ _id: id });
        return blog;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
module.exports = mongoose.model("blog", blogSchema);
