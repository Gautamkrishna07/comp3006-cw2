// Routes relative to "/api/posts"

const express = require("express");

const {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
} = require("../controllers/postController");

const router = express.Router();

// GET
router.get("/", getPosts);

// GET
router.get("/:id", getPost);

// POST
router.get("/", createPost);

// DELETE
router.get("/:id", deletePost);

// UPDATE
router.get("/:id", updatePost);

module.exports = router;