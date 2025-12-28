const Post = require("../models/postModel");
const mongoose = require("mongoose");


const createPost = async (request, response) => {
    const { user, body } = request.body;

    try {
        const post = await Post.create({
            user, body
        });

        const io = request.app.io("socketio");
        io.emit("new_post", post);

        response.status(200).json(post);
    }
    catch (e)
    {
        response.status(400).json({ error: e.message });
    }
}

module.exports = { createPost };