//Import Model To Create Documents
import mongoose from "mongoose";
import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that Id");
  }

  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.send("Access Denied");

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that Id");
  }

  await Post.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully!" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    const userIndex = post.likes.findIndex((id) => id === String(req.userId));

    if (userIndex === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== req.userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
  }
};
