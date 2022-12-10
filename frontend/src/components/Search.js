
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, InputLabel, OutlinedInput} from '@mui/material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import {listAllAlumnis} from '../actions/AlumniActions'
import React, {useState,useEffect} from 'react';
import { generateReport } from '../actions/ReportActions';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';

import { TextField } from '@mui/material';

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
  const [renderedAlumnis, setrenderedAlumnis] = React.useState([])

  // const [searchEntry, setSearchEntry] = React.useState('')
  // const [selectedFile, setSelectedFile] = React.useState();
  const [openFilePopup, setOpenFilePopup] = React.useState(false);  
  const [fname, setFname] = React.useState('');  




 


 

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
  const [idealAlumni, setidealAlumni] = React.useState(al_row)


    const handleSearch = (e)=>{
      // console.log(e.target.value)
      setSearchValue(e.target.value)
       const idealAlumni = all.filter((alumni_e)=>{
        return alumni_e.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      console.log(idealAlumni)
      setidealAlumni(idealAlumni)
    }


  useEffect (()=>{
    // dispatch(listAllAlumnis());

//  console.log(selectedAlumnis)
  
  }, [selectedAlumnis])

  const submitHandler = (e) => {
    e.preventDefault()
    setOpenFilePopup(true)
   
  }

	const [isSelected, setIsSelected] = React.useState(false);
  const handleClickFOpen = () => {
    setOpenFilePopup(true);
  };
  const handleClickFClose = () => {
    setOpenFilePopup(false);
  };

 


  const handleFSubmission = () => {
    dispatch(generateReport(fname,selectedAlumnis.toString()))

    setOpenFilePopup(false);
    
  }
  return (
    
    <React.Fragment>
     <div style={{ height: 400, width: '100%' }}>
     <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount"
          
          >Search </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={searchValue}
            onChange={handleSearch}
            label="Name"
          />
        </FormControl>
        {al_row?
      <DataGrid
        rows={idealAlumni}
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

    <Dialog
        fullWidth={true}
        maxWidth='md'
        open={openFilePopup}
        onClose={handleClickFClose}
      >
        <DialogTitle>
        <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                       Add Alumni
                    </Typography>
                    <Button
                        onClick={()=>{setOpenFilePopup(false)}}>
                        <Close />
                    </Button>
                </div>
        </DialogTitle>
        <DialogContent>
          
        
      
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <TextField fullWidth label="Enter File Name" id="fullWidth"
      value={fname}
      onChange={(e)=>setFname(e.target.value)}
      />
    </Box>
   
		
     
        
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClickFClose}>Close</Button>
          <Button onClick={handleFSubmission}>Generate</Button>
        </DialogActions>
        
      </Dialog>
    </React.Fragment>
   
  );
}
