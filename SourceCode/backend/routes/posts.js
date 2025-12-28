const express = require("express");

const { 
    createPost
} = require("../controllers/postController");

const router = express.Router();

router.get("/", (request, response) => {
    response.json({message: "Get all posts."});
});

router.get("/:id", (request, response) => {
    response.json({message: "Get single post."});
});

router.get("/", createPost)

router.get("/:id", (request, response) => {
    response.json({message: "Delete a post."});
})

router.get("/:id", (request, response) => {
    response.json({message: "Update a post."});
})

module.exports = router;