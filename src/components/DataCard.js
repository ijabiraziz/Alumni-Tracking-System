import React from 'react'
import AnalyticsIcon from "@mui/icons-material/Analytics";


function DataCard({cardTitle, cardNumber, cardPercentage}) {
  return (
    <div className="sales">
    <AnalyticsIcon />
    <div className="middle">
      <div className="left">
        <h3>{cardTitle}</h3>
        <h1>{cardNumber}</h1>
      </div>
      <div className="progress">
        <svg>
          <circle cx="38" cy="38" r="36"></circle>
        </svg>
        <div className="number">
          <p>{cardPercentage}%</p>
        </div>
      </div>
    </div>
    <small className="text-muted">All Time Status</small>
  </div>
  )
}

export default DataCard