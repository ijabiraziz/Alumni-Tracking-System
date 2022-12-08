
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, InputLabel, OutlinedInput} from '@mui/material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import {listAllAlumnis} from '../actions/AlumniActions'
import React, {useState,useEffect} from 'react';
import { generateReport } from '../actions/ReportActions';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";



const mycolumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'location', headerName: 'Location', width: 170 },
  {
    field: 'department',
    headerName: 'Department',
    type: 'text',
    width: 150,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
  },
  {
    field: 'email',
    headerName: 'Email',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  }
];

function createData(id, name, location, department,phone, email) {
  const row= {
     id: id, 
     name: name,
      location: location, 
      department: department,
      phone:phone, 
      email:email 
    }
  return row
}



export default function Search() {
  const [searchValue, setSearchValue] = React.useState('')
  const [selectedAlumnis, setSelectedAlumnis] = React.useState([])

 


 

  var al_row = []

  const dispatch = useDispatch()
  const history = useNavigate();
  const location = useLocation();

  const all_alumnis_s = useSelector (state => state.listAllAlumnis)
  const {error, loading, all_alumni} = all_alumnis_s



  const all=all_alumnis_s.all_alumni
    for (let i = 0; i < all.length; i++) {
      const row = createData(all[i].id, all[i].name, all[i].location, all[i].department,all[i].phone, all[i].email)
      al_row.push(row)
    }



  useEffect (()=>{
    // dispatch(listAllAlumnis());

 console.log(selectedAlumnis)
  
  }, [selectedAlumnis])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(generateReport("Sample name",selectedAlumnis.toString()))
   
  }


  return (
    
    <>
     <div style={{ height: 400, width: '100%' }}>
     <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Search </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            label="Name"
          />
        </FormControl>
        {al_row?
      <DataGrid
        rows={al_row}
        columns={mycolumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(e)=>setSelectedAlumnis(e)}
      />:
      console.log(al_row)
        }

<Box
  display="flex"
  justifyContent="center"
  alignItems="center"

>
<Button variant="outlined" size="large"  onClick={submitHandler} >
          Generate Report
        </Button>
</Box>
    </div>
    </>
   
  );
}
