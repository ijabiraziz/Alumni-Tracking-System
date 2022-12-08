import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DatePlaceHolder from './DatePlaceHolder';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import React, {useState,useEffect} from 'react';
import { listReports } from '../actions/ReportActions';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

function createData(name, entries, date, url) {
  return {name, entries, date, url };
}

const rows = [
  createData('Software Engineers', 4,'12-oct-2022'),
  createData('Python Developers', 21,'12-oct-2022'),

];
export default function Reports({header}) {

  const dispatch = useDispatch()
  const history = useNavigate();
  const location = useLocation();


  const lReports = useSelector (state => state.listReports)
  const {error, loading, reports} = lReports

  var reports_list = []



  // for (let i = 0; i < reports.length; i++) {
  //   const row = createData(reports[i].id, all[i].name, all[i].location, all[i].department,all[i].phone, all[i].email)
  //   al_row.push(row)
  // }

  useEffect (()=>{
    // dispatch(listAllAlumnis());
  dispatch(listReports())


    
 console.log(reports)
  
  }, [])

  return (
    <main>
    <h1>{header}</h1>
    <DatePlaceHolder/>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Report Name</TableCell>
            <TableCell align="right">Entries</TableCell>
            <TableCell align="right">Date</TableCell>
        
          </TableRow>
        </TableHead>
        {reports?
        <TableBody>
          {reports.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.entries}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell> */}
              <TableCell align="right"><a href={`http://127.0.0.1:8000${row.report}`}><FileDownloadIcon/></a></TableCell>
            </TableRow>
          ))}
        </TableBody>:
        console.log(reports)
        }
      </Table>
    </TableContainer>
    </main>
  );
}