const router = require("express").Router();
const Post = require("../models/postModel");
const User = require("../models/userModel");

//Create Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(err);
  }
});

//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log({ post });
    // console.log(post.userId);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.delete();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//like, dislike a post

router.put("/:id/likes", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post);
    if (!post.likes.includes(req.body.userId)) {
      //   await post.updateOne({ $push: req.body });
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Timeline post

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    // console.log(userPosts);
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        console.log("Timeline post", friendId);
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

////get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    //find return with array
    //findOne return with Object
    const user = await User.findOne({ username: req.params.username });
    console.log(user);
    const posts = await Post.find({ userId: user._id });
    console.log(posts);
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
