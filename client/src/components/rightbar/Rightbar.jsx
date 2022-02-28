import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import gift from "../../assets/gift.png";
import ad from "../../assets/ad.png";

import { Users } from "../../dummyData";
import Online from "../Online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Add, Remove } from "@mui/icons-material";

//[
//     user.followings.includes(user?.id),
export default function RightBar({ user }) {
  console.log("RightBar", user);
  const { user: currentUser, dispatch } = useContext(UserContext);
  const [userFriend, setUserFriend] = useState([]);
  const [followed, setFollowed] = useState([
    currentUser.followings.includes(user?.id),
  ]);

  console.log("followed", followed);

  useEffect(() => {
    const userFriend = async () => {
      try {
        const res = await axios.get(
          `https://metachain-social.herokuapp.com/api/v1/users/friends/${user._id}`
        );

        // console.log(res.data);
        setUserFriend(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    userFriend();
  }, [user]);
  console.log("RightBar", userFriend);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(
          `https://metachain-social.herokuapp.com/api/v1/users/${user._id}/unfollow`,
          { userId: currentUser._id }
        );

        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          `https://metachain-social.herokuapp.com/api/v1/users/${user._id}/follow`,
          { userId: currentUser._id }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (e) {
      console.log(e);
    }
  };
  const HomeRightBar = () => {
    return (
      <>
        <div className="rightbarTop">
          <img src={gift} alt="" className="bgImg" />
          <span className="birthdayText">
            <b>Ed Sheeran </b> and <b>3 others friends</b> have a birthday today
          </span>
        </div>

        <img src={ad} alt="" className="advImg" />

        <span className="onlineFriendsText">Online friends</span>
        {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))}
      </>
    );
  };

  const ProfileRightBar = () => {
    // console.log(userFriend);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="userInfo">User information</h4>
        <div className="userInfoWrapper">
          <div className="userInfoContainer">
            <span className="userInfoKey">City: </span>
            <span className="userInfoValue">{user.city}</span>
          </div>
          <div className="userInfoContainer">
            <span className="userInfoKey">From: </span>
            <span className="userInfoValue">{user.from}</span>
          </div>
          <div className="userInfoContainer">
            <span className="userInfoKey">Relationship: </span>
            <span className="userInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Relationship"
                : "Married"}
            </span>
          </div>
        </div>

        <h1 className="userFriendTitle">User friends</h1>
        <div className="rightbarFollowings">
          {userFriend.map((uf) => (
            <Link
              to={"/profile/" + uf.username}
              key={uf._id}
              style={{ textDecoration: "none", color: "black " }}>
              <div className="rightbarFollowing">
                <img
                  className="rightbarFollowingImg"
                  src={
                    uf.profilePicture
                      ? PF + uf.profilePicture
                      : PF + "/person/noAvatar.png"
                  }
                  alt=""
                />
                <span className="rightbarFollowingName">{uf.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      {user ? <ProfileRightBar /> : <HomeRightBar />}
    </div>
  );
}
