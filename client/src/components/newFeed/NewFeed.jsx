import "./newfeed.css";

import React, { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import { Posts } from "../../dummyData";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function NewFeed({ username }) {
  const [post, setPost] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(
            "http://localhost:5000/api/v1/posts/profile/" + username
          )
        : await axios.get(
            `http://localhost:5000/api/v1/posts/timeline/${user._id}`
          );
      setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, [username, user._id]);

  return (
    <div className="newfeed">
      {(!username || username === user.username) && <Share />}

      {post.map((p) => (
        <Post key={p._id} posts={p} />
      ))}
    </div>
  );
}
