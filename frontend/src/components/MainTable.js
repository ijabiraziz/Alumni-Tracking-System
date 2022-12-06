


import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {getDashboardstats, listRecentAlumnis} from '../actions/DashboardActions'
import Loader from './Loader';



function MainTable() {

  const dispatch = useDispatch()
  const history = useNavigate();
  const location = useLocation();

  
  const recentAlumnis = useSelector (state => state.listRecentAlumnis)
  const {error, loading, alumnis} = recentAlumnis


  useEffect (()=>{
    dispatch(listRecentAlumnis());
  }, [])



 


  return (


    <div className="recent-alumni">
    <h2>Recent Alumni</h2>
    <table>
    {console.log(alumnis)}
      <thead>
        <tr>
          <th>Alumni Name</th>
          <th>Program </th>
          <th>GPA</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>

  {alumnis?

      <tbody>

{alumnis.map(alumni =>(
<tr key={alumni.id}>
<td>{alumni.name}</td>
<td>{alumni.program}</td>
<td>{alumni.cgpa}</td>
<td className="warning">{alumni.phone}</td>
<td className="primary">Details</td>
</tr>
         
       ))}



       
       
      </tbody>:
      <p>error</p>
}
    </table>
    <Link to="/"> Show All </Link>
  </div>
  )
}

export default MainTable