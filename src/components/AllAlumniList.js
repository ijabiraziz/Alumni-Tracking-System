import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {listAllAlumnis} from '../actions/AlumniActions'

function createAlumniData(id,name, is_employed, is_student, cgpa, batch, email_d,phone_d,location_d) {
  return {
    id,
    name,
    is_employed,
    is_student,
    cgpa,
    batch,
    details: [
      {
        email: `${email_d}`,
        phone: `${phone_d}`,
        location: `${location_d}`,
      }
    ],
  };
}


function AlumniRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.is_employed}</TableCell>
        <TableCell align="right">{row.is_student}</TableCell>
        <TableCell align="right">{row.cgpa}</TableCell>
        <TableCell align="right">{row.batch}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell align="right">Location</TableCell>
                    <TableCell align="right">Batch</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailRow) => (
                    <TableRow key={row.details.email}>
                      <TableCell component="th" scope="row">
                        {detailRow.email}
                      </TableCell>
                      <TableCell>{detailRow.phone}</TableCell>
                      <TableCell align="right">{detailRow.location}</TableCell>
                      <TableCell align="right">
                        { 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };




export default function AllAlumniList({header}) {

  var al_row = []

  const dispatch = useDispatch()
  const history = useNavigate();
  const location = useLocation();

  const all_alumnis_s = useSelector (state => state.listAllAlumnis)
  const {error, loading, all_alumni} = all_alumnis_s

  useEffect (()=>{
    dispatch(listAllAlumnis());
  }, [])

  const myapply = (alumni)=>{
    var a=createAlumniData(alumni.id,alumni.name,alumni.is_employed,
      alumni.is_student,alumni.cgpa,alumni.batch_name,alumni.email, alumni.phone,
      alumni.location)  
      al_row.push(a)
  }


  if (loading===false){
    {all_alumni.map((alumni) => (
        myapply(alumni)
    ))}
  }
   
       


  return (
    <main>
    <h1>{header}</h1>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Is Employed</TableCell>
            <TableCell align="right">Is Student</TableCell>
            <TableCell align="right">CGPA</TableCell>
            <TableCell align="right">Batch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {al_row.map((row) => (
            <AlumniRow key={row.id} row={row} />
          ))}
        
        </TableBody>
      </Table>
    </TableContainer>
    </main>
  );
}
