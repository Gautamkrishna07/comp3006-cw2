const express = require("express");
const router = express.Router();

const {
    loginUser,
    signupUser,
    getUserById,
    getUserByUsername
} = require("../controllers/userController");

// Routes relative to "/api/users"
router.post("login", loginUser);
router.post("signup", signupUser);
router.get("/id/:id", getUserById);
router.get("/username/:username", getUserByUsername);

module.exports = router;
