import React from "react";
import Sidebar from "../components/Sidebar";
import "./../theme/ProfileScreen.css";

function ProfileScreen() {
  return (
    <div className="profile-main-container">
      {/* Sidebar */}
      <Sidebar loc={1} />

      {/* Profile */}
      <div className="profile-container">
      <img class=' avator' src="assets/avatar.jpg"/>

        <div class="container">
          <div class="item">
            <h2>Name</h2>
            <h2>Hazrat Ali</h2>
          </div>
        </div>
        <div class="container">
          <div class="item">
            <h2>Department</h2>
            <h2>Computer Science</h2>
          </div>
        </div>
        <div class="container">
          <div class="item">
            <h2>Email</h2>
            <h2>ali@gmail.com</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileScreen;
