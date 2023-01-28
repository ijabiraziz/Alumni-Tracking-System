
import Popup from './Popup'
import RecentAlumniCard from './RecentAlumniCard'
import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function Right() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const [name,setName]=useState('')


  useEffect (()=>{
    if (userInfo){
      setName(userInfo.data.Name)
    }
 
  }, [ userInfo])
 
  return (
    <div className="right">
    {/* Start of top  */}
    <div className="top">
    <div className="profile">
      <div className="info">
        <p>
          Hey, <b>{name}</b>
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