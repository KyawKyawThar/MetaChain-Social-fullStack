const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//update User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const updateUser = await userModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(404).json("You can update only your account");
  }
});

//delete User

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been delete successfully");
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

//get User
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const getUser = userId
      ? await userModel.findById(userId)
      : await userModel.findOne({ username: username });
    // console.log({ getUser });
    const { password, createdAt, ...other } = getUser._doc;
    res.status(200).json(other);
  } catch (e) {
    res.status(500).json(e);
  }
});

//get User's friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);

    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return userModel.findById(friendId);
      })
    );
    // console.log(friends);
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    console.log(friendList);
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Follow a use

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await userModel.findById(req.params.id);
      // console.log({ currentUser });
      const followerAcc = await userModel.findById(req.body.userId);
      //console.log({ followerAcc });
      if (!currentUser.followers.includes(req.body.userId)) {
        await currentUser.updateOne({ $push: { followers: req.body.userId } });
        await followerAcc.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});

//Unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const followerAcc = await userModel.findById(req.body.userId);
      // console.log({ followerAcc });
      const currentUser = await userModel.findById(req.params.id);
      // console.log({ currentUser });
      if (currentUser.followers.includes(req.body.userId)) {
        await followerAcc.updateOne({ $pull: { followings: req.params.id } });
        await currentUser.updateOne({ $pull: { followers: req.body.userId } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;
