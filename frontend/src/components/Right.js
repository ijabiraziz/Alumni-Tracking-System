import React from 'react'
import Popup from './Popup'
import RecentAlumniCard from './RecentAlumniCard'

function Right() {
  return (
    <div className="right">
    {/* Start of top  */}
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
    
    {/* End of top  */}
    <RecentAlumniCard/>
    {/* End of Recent Post */}
   <Popup/>
    </div>
  )
}

export default Right