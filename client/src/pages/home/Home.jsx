import React from "react";
import NavBar from "../../components/navbar/NavBar";
import NewFeed from "../../components/newFeed/NewFeed";
import RightBar from "../../components/rightbar/Rightbar";
import SideBar from "../../components/sidebar/Sidebar";
import "./home.css";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="home">
        <SideBar />
        <NewFeed />
        <RightBar />
      </div>
    </>
  );
}
