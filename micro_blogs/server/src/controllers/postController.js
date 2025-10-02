import Post from '../models/Post.js';
import User from '../models/User.js';


export const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      description: req.body.description,
      author: req.user._id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const editPost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { title: req.body.title, description: req.body.description },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const following = user.following.concat([user._id]);
    const posts = await Post.find({ author: { $in: following } })
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
