const express = require("express");
// Need to inherit :postId from parent router ("/api/posts/:postId/comments")
const router = express.Router({ mergeParams: true });

const {
    getComments,
    createComment,
    deleteComment,
} = require("../controllers/commentController");

// Routes relative to "/api/posts/:postId/comments"
router.get("/", getComments);
router.post("/", createComment);
router.delete("/:commentId", deleteComment);

module.exports = router;
