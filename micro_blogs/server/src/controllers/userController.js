export const listUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('username avatar');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('followers following', 'username avatar');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);
    if (!userToFollow || !currentUser) return res.status(404).json({ message: 'User not found' });
    if (userToFollow.followers.includes(currentUser._id)) return res.status(400).json({ message: 'Already following' });
    userToFollow.followers.push(currentUser._id);
    currentUser.following.push(userToFollow._id);
    await userToFollow.save();
    await currentUser.save();
    res.json({ message: 'Followed user' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);
    if (!userToUnfollow || !currentUser) return res.status(404).json({ message: 'User not found' });
    userToUnfollow.followers = userToUnfollow.followers.filter(f => f.toString() !== currentUser._id.toString());
    currentUser.following = currentUser.following.filter(f => f.toString() !== userToUnfollow._id.toString());
    await userToUnfollow.save();
    await currentUser.save();
    res.json({ message: 'Unfollowed user' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
