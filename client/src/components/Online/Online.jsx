import React from "react";
import "./online.css";

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <ul className="onlineFrinedList">
        <li className="onlineFrinedLink">
          <img src={PF + user.profilePicture} alt="" className="onlineFriImg" />
          <div className="greenBubble"></div>
          <span className="onlineFri">{user.username}</span>
        </li>
      </ul>
    </div>
  );
}
