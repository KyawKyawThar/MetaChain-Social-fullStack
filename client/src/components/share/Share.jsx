import React, { useContext, useRef, useState } from "react";
import "./share.css";

import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(UserContext);

  const desc = useRef();
  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      console.log({ data });
      const fileName = Date.now() + file.name; //file path
      console.log({ fileName });
      data.append("name", fileName);
      data.append("file", file);
      userPost.img = fileName;
      // console.log({ userPost });
      try {
        await axios.post(
          "https://metachain-social.herokuapp.com/api/v1/upload",
          data
        );
      } catch (e) {
        console.log(e);
      }
    }
    try {
      await axios.post(
        "https://metachain-social.herokuapp.com/api/v1/posts",
        userPost
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="share">
      <div className="shareTop">
        <img
          alt=""
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          className="sharImg"
        />
        <input
          placeholder={`What's in your mind ${user.username}?`}
          ref={desc}
          className="shareInput"
        />
      </div>
      <hr className="shareHr" />
      {file && (
        <div className="shareImgContainer">
          <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
          <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
        </div>
      )}
      <form className="shareBottom" onSubmit={handleSubmit}>
        <ul className="shareItem">
          <label htmlFor="file" className="shareItemLink">
            <PermMedia style={{ color: "orangered", fontSize: "20px" }} />
            <span>Photo or Video</span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <li className="shareItemLink">
            <Label style={{ color: "blue", fontSize: "20px" }} />
            <span>Tags</span>
          </li>
          <li className="shareItemLink">
            <Room style={{ color: "green", fontSize: "20px" }} />
            <span>Location</span>
          </li>
          <li className="shareItemLink">
            <EmojiEmotions style={{ color: "goldenrod", fontSize: "20px" }} />
            <span>Feelings</span>
          </li>
        </ul>
        <button className="shareBtn" type="submit">
          Share
        </button>
      </form>
    </div>
  );
}
