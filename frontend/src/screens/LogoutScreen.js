import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Right from "../components/Right";

function LogoutScreen() {
  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar loc={8} />
      {/* Main */}
      <Main header={'Dashboard'}/>
      {/* Right  */}
     <Right/>
    </div>
  );
}

export default LogoutScreen