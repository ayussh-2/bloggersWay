const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.statics.signup = async function (email, password) {
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("User exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hashPassword });
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

module.exports = mongoose.model("user", userSchema);
