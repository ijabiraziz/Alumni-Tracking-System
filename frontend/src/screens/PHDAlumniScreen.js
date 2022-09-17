import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Right from "../components/Right";

function PHDAlumniScreen() {
  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar loc={6}/>
      {/* Main */}
      
      {/* Right  */}
     <Right/>
    </div>
  );
}

export default PHDAlumniScreen