import React from "react";
import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="sidebarFriendList">
      <img
        alt="sidebarImg"
        src={PF + user.profilePicture}
        className="sidebarImg"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </div>
  );
}
