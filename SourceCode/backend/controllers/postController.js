const { request } = require("express");
const Post = require("../models/postModel");
const mongoose = require("mongoose");


const getPosts = async (request, response) => {
    const posts = await Post.find({}).toSorted({createdAt: -1});
    response.status(200).json(posts);
};


const getPost = async (request, response) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({error: "Invalid ID format."});
    }

    const post = await Post.findById(id);
    if (!post) {
        return response.status(404).json({error: "Post not found."});
    }

    response.status(200).json(post);
}


const createPost = async (request, response) => {
    const { user, body } = request.body;

    let emptyFields = [];
    if (!user) emptyFields.push("user");
    if (!body) emptyFields.push("body");
    if (emptyFields.length > 0)
        return response.status(400).json({ error: "Please fill in all fields.", emptyFields });

    try {
        const post = await Post.create({
            user, body
        });

        const io = request.app.io("socketio");
        io.emit("new_post", post);

        response.status(201).json(post);
    }
    catch (e)
    {
        response.status(500).json({ error: e.message });
    }
}


const deletePost = async (request, response) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({error: "Invalid ID format."});
    }

    const post = await Post.findByIdAndDelete(id);
    if (!post) {
        return response.status(404).json({error: "Post not found."});
    }

    const io = request.app.io("socketio");
    io.emit("deleted_post", id);

    response.status(204);
}


const updatePost = async (request, response) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({error: "Invalid ID format."});
    }

    const post = await Post.findByIdAndUpdate(id, { ...request.body });
    if (!post) {
        return response.status(404).json({error: "Post not found."});
    }

    response.status(200).json(post);
}


module.exports = { getPosts, getPost, createPost, deletePost, updatePost };
