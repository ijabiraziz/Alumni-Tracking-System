import React from 'react'
import AddIcon from '@mui/icons-material/Add';
function AddAlumniCard() {
  return (
    <div className="sales-analytics">
    <h2>Added New Alumni</h2>
    <div className="item add-product">
      <div>
        <span><AddIcon/></span>
        <h3>Add Single Alumni</h3>
      </div>
    </div>
    <div className="item add-product">
      <div>
        <span><AddIcon/></span>
        <h3>Upload CSV File</h3>
      </div>
    </div>
  </div>
  )
}

export default AddAlumniCard