const express = require("express");

const {
    loginUser,
    signupUser,
    likeBlog,
} = require("../controllers/usersContoller");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/like", likeBlog);

module.exports = router;
