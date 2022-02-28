import React, { useContext } from "react";
import "./navbar.css";

import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function NavBar() {
  const { user } = useContext(UserContext);
  // console.log(user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="navbar">
      <div className="navbarLeft">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <h1 className="navbar-logo">MetaChain</h1>
        </Link>
      </div>
      <div className="navbarMiddle">
        <div className="navbarSearch">
          <Search style={{ color: "black", fontSize: "18px" }} />
          <input
            placeholder="Search for friends,posts,or videos"
            className="searchInput"
          />
        </div>
      </div>
      <div className="navbarRight">
        <ul className="navbarLinks">
          <li className="navbarItem">Homepage</li>
          <li className="navbarItem">Timeline</li>
        </ul>

        <div className="navbarIcons">
          <div className="navbarIcon">
            <Person style={{ fontSize: "22px" }} />
            <div className="navbarBadgets">5</div>
          </div>

          <div className="navbarIcon">
            <Chat style={{ fontSize: "22px" }} />
            <div className="navbarBadgets">4</div>
          </div>

          <div className="navbarIcon">
            <Notifications style={{ fontSize: "22px" }} />
            <div className="navbarBadgets">9</div>
          </div>
        </div>

        <div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "/person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
