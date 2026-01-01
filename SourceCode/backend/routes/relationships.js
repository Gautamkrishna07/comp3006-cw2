const express = require("express");

const {
    followUser,
    unfollowUser,
    getFollowing,
    getFollowers,
} = require("../controllers/relationshipController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Routes relative to "/api/relationships"
// PUBLIC ROUTES

// MIDDLEWARE
router.use(requireAuth);
// PROTECTED ROUTES
router.post("/:targetUserId", followUser);
router.delete("/:targetUserId", unfollowUser);
router.get("/:userId/following", getFollowing);
router.get("/:userId/followers", getFollowers);

module.exports = router;
