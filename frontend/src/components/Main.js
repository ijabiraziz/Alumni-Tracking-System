
import DatePlaceHolder from './DatePlaceHolder';
import DataCard from './DataCard';
import MainTable from './MainTable';
import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {getDashboardstats} from '../actions/DashboardActions'
import Loader from './Loader';
function Main({header}) {

  const dispatch = useDispatch()
  const history = useNavigate();
  const location = useLocation();

  const dashboardstats = useSelector (state => state.getDashboardstats)
  const {error, loading, dashboard} = dashboardstats

 



  useEffect (()=>{
    dispatch(getDashboardstats());
  }, [])




  return (
    <main>
        <h1>{header}</h1>
        <DatePlaceHolder/>
        <div className="insights">
        {/* Cards */}
        {dashboard?
        <>
       
            <DataCard cardTitle={'Total Alumni'} cardNumber={dashboard.total_alumnis} cardPercentage={100}/>
            <DataCard cardTitle={'Employess Status'} cardNumber={dashboard.employed_alumnis} cardPercentage={24}/>
            <DataCard cardTitle={'Student Status' } cardNumber={dashboard.student_alumni} cardPercentage={24}/>
          </>
          : <Loader/>
          }
        </div>
        {/* Start of Table  */}
        <MainTable/>
  </main>
  )
}

export default Main