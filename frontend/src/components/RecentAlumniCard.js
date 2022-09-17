import React from 'react'

function RecentAlumniCard() {
  return (
    <div className="recent-updates">
    <h2>Recent Updates</h2>
    <div className="updates">
      <div className="update">
        <div className="profile-photo">
          <img src="./assets/profile-2.jpg" />
        </div>
        <div className="message">
          <p>
            <b>Hazrat Ali</b> Just Updated His Job Description.
          </p>
          <small className="text-muted">2 Minutes Ago</small>
        </div>
      </div>
      <div className="update">
        <div className="profile-photo">
          <img src="./assets/profile-2.jpg" />
        </div>
        <div className="message">
          <p>
            <b>Amir Abbas</b> Update His Profile Picture and Email address.
          </p>
          <small className="text-muted">2 Minutes Ago</small>
        </div>
      </div>
      <div className="update">
        <div className="profile-photo">
          <img src="./assets/profile-2.jpg" />
        </div>
        <div className="message">
          <p>
            <b>Sarfaraz Ali</b> Update his Social handles. 
          </p>
          <small className="text-muted">2 Minutes Ago</small>
        </div>
      </div>
    </div>
  </div>
  )
}

export default RecentAlumniCard