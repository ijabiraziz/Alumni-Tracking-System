
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, InputLabel, OutlinedInput} from '@mui/material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import {listAllAlumnis} from '../actions/AlumniActions'
import React, {useState,useEffect} from 'react';
import { generateReport } from '../actions/ReportActions';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { search_alumni, get_search_alumni } from '../actions/AlumniActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';

import { TextField } from '@mui/material';
import { sendEMail } from '../actions/EmailActions';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import FilterListIcon from '@mui/icons-material/FilterList';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import store from '../store';

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
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
 

  var al_row = []

  const dispatch = useDispatch()
  const history = useNavigate();
  const location = useLocation();


  const [name_d, setname_d] = React.useState('')
  const [location_d, setlocation_d] = React.useState('')
  const [company_d, setcompany_d] = React.useState('')
  const [position_d, setposition_d] = React.useState('')
  const [phone_d, setphone_d] = React.useState('')
  const [email_d, setemail_d] = React.useState('')


  


  const [idealAlumni, setidealAlumni] = React.useState(al_row)
  const all_alumnis_s = useSelector (state => state.searchAlumni)
  var all=all_alumnis_s.search_alumni

  if (all_alumnis_s)
   { 
    
    for (let i = 0; i < all.length; i++) {
      const row = createData(all[i].id, all[i].name, all[i].location, all[i].department_name,all[i].phone, all[i].email)
      al_row.push(row)
    }}



    

  const [stateloading, setStateloading] = React.useState(false)

  const deepSerach = ()=>{

    dispatch(search_alumni(name_d, location_d, company_d, position_d, phone_d, email_d))

    const update_state = store.getState()
    al_row=[]
    var all=update_state.searchAlumni.search_alumni
    console.log(all)

      for (let i = 0; i < all.length; i++) {
        const row = createData(all[i].id, all[i].name, all[i].location, all[i].department_name,all[i].phone, all[i].email)
        al_row.push(row)
      }
      setidealAlumni(al_row)
      console.log(al_row)
    
  };

  useEffect (()=>{
    // al_row=[]
    // var all=all_alumnis_s.search_alumni
    //   for (let i = 0; i < all.length; i++) {
    //     const row = createData(all[i].id, all[i].name, all[i].location, all[i].department_name,all[i].phone, all[i].email)
    //     al_row.push(row)
    //   }
    //   setidealAlumni(al_row)
    //   console.log(idealAlumni)
  }, [store.getState().searchAlumni.search_alumni])

  
  

 






    const handleSearch = (e)=>{
      // console.log(e.target.value)
      setSearchValue(e.target.value)
       const idealAlumni = all.filter((alumni_e)=>{
        return alumni_e.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      console.log(idealAlumni)
      setidealAlumni(idealAlumni)
    }


 

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
  const sendNotification = () => {
    // console.log(selectedAlumnis.toString())
    dispatch(sendEMail(selectedAlumnis.toString()))
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

        <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
        <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <FilterListIcon />
        </ListItemIcon>
        <ListItemText primary="Apply Filter for Deep Search" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <Box
  display="flex"
  flexWrap="wrap"
  justifyContent="center"
  alignItems="center"
width="100%"


>

<Box width={230} margin={1}>
        <TextField
          label="Name Contain"
          variant="filled"
          onChange={(e)=>setname_d(e.target.value)}
        />
        </Box>
       
        <Box width={230} margin={1}>
        <TextField
          label="Location Contain"
          variant="filled"
          onChange={(e)=>setlocation_d(e.target.value)}
        />
        </Box>
        <Box width={200} margin={1}>
        <TextField
          label="Company Contain"
          variant="filled"
          onChange={(e)=>setcompany_d(e.target.value)}
        />
        </Box>
        <Box width={200} margin={1}>
        <TextField
          label="Email Contain"
          variant="filled"
          onChange={(e)=>setemail_d(e.target.value)}
        />
        </Box>
        <Box width={200} margin={1}>
        <TextField
          label="Phone Contain"
          variant="filled"
          onChange={(e)=>setphone_d(e.target.value)}
        />
        </Box>
        <Box width={200} margin={1}>
        <TextField
          label="Position Contain"
          variant="filled"
          onChange={(e)=>setposition_d(e.target.value)}
        />
        </Box>
 
        </Box>
        <Box
  display="flex"
  justifyContent="center"
  alignItems="center">
  <Button variant="contained" onClick={()=>{deepSerach()}}>Apply</Button>
  </Box>
        </List>
      </Collapse>
    </List>
        {!search_alumni.loading?
        <>
       
  
      <DataGrid
        rows={idealAlumni}
        columns={mycolumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(e)=>setSelectedAlumnis(e)}
      />
    
       </>
      :
      <></>
        }

<Box
  display="flex"
  justifyContent="center"
  alignItems="center"


>
<Button variant="outlined" size="large"  onClick={submitHandler} >
          Generate Report
        </Button>
        <Button variant="outlined" size="large"  onClick={sendNotification}  sx={{ ml: 2 }}>
          Notify Update
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
