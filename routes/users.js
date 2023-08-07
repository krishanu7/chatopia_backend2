const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const username = req.query.username;
  try {
    let users;
    if (userId) {
      const currentUser = await User.findById(userId);
      users = await User.find({ _id: { $ne: currentUser._id } });
    } else if (username) {
      const currentUser = await User.findOne({ username: username });
      users = await User.find({ _id: { $ne: currentUser._id } });
    }
    const friendList = users.map(user => {
      const { _id, username, profilePicture } = user;
      return { _id, username, profilePicture };
    });

    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
