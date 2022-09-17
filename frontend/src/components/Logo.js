import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function Logo() {
  return (
    <div className='top'>
    <div className='logo'>
      <img src='/assets/logo.png' alt='logo'/>
      <h2>ATS <span className='danger'>UOP </span></h2>
    </div>
    <div className='close' id='close-btn'>
      <span > <CloseIcon/>Close</span>
    </div>
  </div>
  )
}

export default Logo