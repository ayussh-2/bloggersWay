const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likes: { type: Array },
});

userSchema.statics.signup = async function (name, email, password) {
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("User exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ name, email, password: hashPassword });
    return user;
};

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
        throw new Error("Invalid password");
    }

    return user;
};

userSchema.statics.findUser = async function (uid) {
    const user = await this.findOne({ _id: uid });
    if (!user) {
        throw new Error("User not found!");
    }
    return user;
};

userSchema.statics.likes = async function (uid, like) {
    const user = await this.findOne({ _id: uid });
    if (!user) {
        throw new Error("User not found");
    }

    const likes = user.likes;
    let update;

    if (!likes.includes(like)) {
        update = await this.updateOne({ _id: uid }, { $push: { likes: like } });
    } else {
        update = await this.updateOne({ _id: uid }, { $pull: { likes: like } });
    }

    return update;
};

module.exports = mongoose.model("user", userSchema);
