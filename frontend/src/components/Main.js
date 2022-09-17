import React from 'react'
import DatePlaceHolder from './DatePlaceHolder';
import DataCard from './DataCard';
import MainTable from './MainTable';
function Main({header}) {
  return (
    <main>
        <h1>{header}</h1>
        <DatePlaceHolder/>
        <div className="insights">
        {/* Cards */}
            <DataCard cardTitle={'Total Alumni'} cardNumber={100} cardPercentage={90}/>
            <DataCard cardTitle={'Employess Status'} cardNumber={23123} cardPercentage={24}/>
            <DataCard cardTitle={'Student Status' } cardNumber={23123} cardPercentage={24}/>
        </div>
        {/* Start of Table  */}
        <MainTable/>
  </main>
  )
}

export default Main