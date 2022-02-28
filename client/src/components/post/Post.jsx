import React, { useContext, useEffect, useState } from "react";
import "./post.css";

import { MoreVert } from "@mui/icons-material";

import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Post({ posts }) {
  const [liked, setLiked] = useState(posts.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  //currentUser is nickname of user
  const { user: currentUser } = useContext(UserContext);

  // console.log("Nickname", currentUser);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://metachain-social.herokuapp.com/api/v1/users?userId=${posts.userId}`
      );
      setUser(res.data);
    };

    fetchUser();
  }, [posts.userId]);

  //check condition user already like or dislike
  useEffect(() => {
    setIsLiked(posts.likes.includes(currentUser._id));
  }, [currentUser._id, posts.likes]);

  const likeHandler = () => {
    try {
      axios.put(
        `https://metachain-social.herokuapp.com/api/v1/posts/${posts._id}/likes`,
        {
          userId: currentUser._id,
        }
      );
    } catch (e) {}
    setLiked(isLiked ? liked - 1 : liked + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="sidebarWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="profileImg"
              />
            </Link>
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}>
              <span className="postUsername">{user.username}</span>
            </Link>

            <span className="postTime">{format(posts.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postStatus">{posts?.desc}</span>

          <img src={PF + posts.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
              className="postReaction"
            />
            <img
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
              className="postReaction"
            />
            <span>{liked} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCmt">{posts.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
