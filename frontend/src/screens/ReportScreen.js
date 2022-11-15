import React from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/ReportScreen.css";

function ReportScreen() {
  return (
    <div className="container">
    {/* Sidebar */}
    <Sidebar loc={1}/>
    
    {/* Reports Screen */}
    <div className="profile-container">     
          <h1 className="name">Generate Reports Here</h1>
          <h2> haxratali0@gmail.com</h2>
          <h2> Department : Computer Science</h2>
          <h2 className="success"> You have currently Enrolled 4000 students</h2>
    </div>
   
   
  </div>
  );
}
export default ReportScreen