const user = require("../models/userModel");
const loginUser = async (req, res) => {
    // res.json({ msg: "Login user" });
    const { email, password } = req.body;
    try {
        const userDetails = await user.login(email, password);
        res.status(200).json(userDetails);
    } catch (err) {
        res.status(400).json({ err: "User not found!" });
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

module.exports = { loginUser, signupUser };
