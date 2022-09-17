import React from 'react'

function AdminTop() {
  return (
    <div className="top">
      <div className="profile">
        <div className="info">
          <p>
            Hey, <b>Ali </b>
          </p>
          <small className="text -muted ">Admin </small>
        </div>
        <div className="profile-photo">
          <img src="./assets/profile-1.jpg" alt='profile' />
        </div>
      </div>
    </div>
  )
}

export default AdminTop