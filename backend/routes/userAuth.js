const express = require("express");

const {
    loginUser,
    signupUser,
    likeBlog,
    findUserById,
} = require("../controllers/usersContoller");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/like", likeBlog);
router.post("/findUser", findUserById);

module.exports = router;
