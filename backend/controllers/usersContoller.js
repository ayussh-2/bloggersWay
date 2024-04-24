const user = require("../models/userModel");
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDetails = await user.login(email, password);
        res.status(200).json({ msg: "success", user: userDetails });
    } catch (err) {
        res.status(400).json({ msg: "User not found!" });
    }
};

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await user.signup(name, email, password);
        res.status(200).json({ email, newUser });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

const likeBlog = async (req, res) => {
    const { email, blog } = req.body;
    try {
        const liked = await user.likes(email, blog);
        res.status(200).json({ msg: "success" });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

module.exports = { loginUser, signupUser, likeBlog };
