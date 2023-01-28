import React from 'react'

function DatePlaceHolder() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    var formatedDate = today.toLocaleDateString("en-US", options);
  return (
    <div className="date">
    <p> <span>{formatedDate}</span></p>
  </div>
  )
}

export default DatePlaceHolder