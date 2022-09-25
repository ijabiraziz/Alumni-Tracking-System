import React from "react";
import "./../styles/HomeScreen.css";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Right from "../components/Right";

function HomeScreen() {
  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar loc={0} />
      {/* Main */}
      <Main header={'Dashboard'}/>
      {/* Right  */}
     <Right/>
    </div>
  );
}

export default HomeScreen;
