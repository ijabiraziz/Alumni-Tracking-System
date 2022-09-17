import React from 'react'
import AddAlumniCard from './AddAlumniCard'
import AdminTop from './AdminTop'
import RecentAlumniCard from './RecentAlumniCard'

function Right() {
  return (
    <div className="right">
    {/* Start of top  */}
    <AdminTop/>
    {/* End of top  */}
    <RecentAlumniCard/>
    {/* End of Recent Post */}
   <AddAlumniCard/>
    </div>
  )
}

export default Right