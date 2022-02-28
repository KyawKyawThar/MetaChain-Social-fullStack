import React, { useEffect, useState } from "react";
import "./profile.css";

import NavBar from "../../components/navbar/NavBar";
import NewFeed from "../../components/newFeed/NewFeed";
import RightBar from "../../components/rightbar/Rightbar";
import SideBar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const params = useParams();

  const username = params.username;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://metachain-social.herokuapp.com/api/v1/users?username=${username}`
      );

      setUser(res.data);
    };

    fetchUser();
  }, [username]);

  return (
    <>
      <NavBar />
      <div className="profile">
        <div className="profileSidebar">
          <SideBar />
        </div>

        <div className="profileRight">
          <div className="profileRightTop">
            <div className="coverImgContainer">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "/person/noCover.png"
                }
                alt=""
                className="coverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
                className="profilePicture"
              />
            </div>
            <div className="profileInfo">
              <h1 className="profileName">{user.username}</h1>
              <p className="profileDesc">{user.desc}</p>
            </div>
          </div>

          <div className="profileRightBottom">
            <NewFeed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
