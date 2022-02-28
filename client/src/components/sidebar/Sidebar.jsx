import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";

import React from "react";

import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sideBarContainer">
        <ul className="sideBarItem">
          <div className="sideBarLink">
            <RssFeed style={{ fontSize: "20px" }} />
            <li>Feed</li>
          </div>
          <div className="sideBarLink">
            <Chat style={{ fontSize: "20px" }} />
            <li>Chats</li>
          </div>
          <div className="sideBarLink">
            <PlayCircleFilledOutlined style={{ fontSize: "20px" }} />
            <li>Videos</li>
          </div>
          <div className="sideBarLink">
            <Group style={{ fontSize: "20px" }} />
            <li>Groups</li>
          </div>
          <div className="sideBarLink">
            <Bookmark style={{ fontSize: "20px" }} />
            <li>Bookmarks</li>
          </div>
          <div className="sideBarLink">
            <HelpOutline style={{ fontSize: "20px" }} />
            <li>Questions</li>
          </div>
          <div className="sideBarLink">
            <WorkOutline style={{ fontSize: "20px" }} />
            <li>Jobs</li>
          </div>
          <div className="sideBarLink">
            <Event style={{ fontSize: "20px" }} />
            <li>Events</li>
          </div>
          <div className="sideBarLink">
            <School style={{ fontSize: "20px" }} />
            <li>Online-Learnings</li>
          </div>
        </ul>

        <button className="sideBarBtn">Show More</button>
        <hr className="sidebarHr" />
        {Users.map((u) => (
          <CloseFriend key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
}
