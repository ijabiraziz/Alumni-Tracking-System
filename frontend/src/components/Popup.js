import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';
import  {TextField} from '@mui/material';
import { listDepartments } from '../actions/DepartmentActions'; 


import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, {useState,useEffect} from 'react';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { addAlumni, add_bulk_Alumni } from '../actions/AlumniActions';
import { listBatches } from '../actions/AlumniActions';
import { listPrograms } from '../actions/AlumniActions';


export default function Popup() {

  const dispatch = useDispatch()
  const history = useNavigate();

  const [selectedFile, setSelectedFile] = React.useState();
	const [isSelected, setIsSelected] = React.useState(false);
  const [openFilePopup, setOpenFilePopup] = React.useState(false);  
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword,setShowPassword] = React.useState(false);
  const [department, setDepartment] = React.useState('');
  const [phoneNo, setphoneNo] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [cgpa, setCgpa] = React.useState('');
  const [batch, setBatch] = React.useState('');
  const [program, setProgram] = React.useState('');
  const [isEmployed, setIsEmployed] = React.useState("Yes");
  const [isStudent, setIsStudent] = React.useState("No");


  const departmentList = useSelector(state=>state.listDepartments)
  const {d_error, d_loading, departments} = departmentList

  const batchList = useSelector(state=>state.listBatches)
  const {batch_list} = batchList

  const programList = useSelector(state=>state.listPrograms)
  const { program_list} = programList


  useEffect (()=>{
    dispatch(listDepartments())
    dispatch(listBatches())
    dispatch(listPrograms())
  
}, [open])

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickFOpen = () => {
    setOpenFilePopup(true);
  };
  const handleClickFClose = () => {
    setOpenFilePopup(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const changeHandler = (event) => {
		setIsSelected(true);
		setSelectedFile(event.target.files[0]);    
    var file = event.target.files[0]
    console.log(file.name)

	};

  function getIdByName(list,name) {
    const obj = list.find(item => item.name === name);
    return obj ? obj.id : null;
  }

  
	const handleSubmission = () => {
    const batch_id= getIdByName(batch_list, batch)
    const program_id = getIdByName(program_list, program)
    const department_id = getIdByName(departments, department)

    dispatch(addAlumni(
      name,
      email,
      department_id,
      location,
      phoneNo,
      company,
      position,
      cgpa,
      isEmployed,
      isStudent,
      batch_id,
      program_id
      ))
      setOpen(false);


	};

  const handleFSubmission = () => {
    console.log(selectedFile)
    dispatch(add_bulk_Alumni(selectedFile.name, "", selectedFile))
    setOpenFilePopup(false);
    
  }

  return (
    <React.Fragment>
    <div className="sales-analytics">
    <h2>Added New Alumni</h2>
    <div onClick={handleClickOpen} className="item add-product">
      <div>
        <span><AddIcon/></span>
        <h3>Add Single Alumni</h3>
      </div>
    </div>
    <div onClick={handleClickFOpen} className="item add-product">
      <div>
        <span><AddIcon/></span>
        <h3>Upload CSV File</h3>
      </div>
    </div>
  </div>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
        <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                       Add Alumni
                    </Typography>
                    <Button
                        onClick={()=>{setOpen(false)}}>
                        <Close />
                    </Button>
                </div>
        </DialogTitle>
        <DialogContent>
          
          
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            label="Name"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            label="Email"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e)=>setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <TextField
          id="outlined-select-currency"
          select
          label="Department"
          value={department}
          onChange={(e)=>setDepartment(e.target.value)}
          fullWidth sx={{ m: 1 }}
        >
          {departments.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Phone</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={phoneNo}
            onChange={(e)=>setphoneNo(e.target.value)}
            label="Phone"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Location</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            label="Location"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Company</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
            label="Company"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Position</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={position}
            // onChange={(e)=>setPosition(e.target.value)}
            onChange={(e)=>setPosition(e.target.value)}

            label="Position"
          />
        </FormControl>


      </div>

      <div>
      <FormControl  sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">CGPA</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={cgpa}
            // onChange={setCgpa((e)=>e.target.value)}
            onChange={(e)=>setCgpa(e.target.value)}
            label="CGPA"
          />
        </FormControl>
        <TextField
          id="outlined-select-currency"
          select
          label="Batch"
          value={batch}
          onChange={(e)=>setBatch(e.target.value)}
          fullWidth sx={{ m: 1 }}
        >
          {batch_list.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Batch"
          value={program}
          onChange={(e)=>setProgram(e.target.value)}
          fullWidth sx={{ m: 1 }}
        >
          {program_list.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
<FormControl sx={{ m: 1 }}>
  <InputLabel id="demo-simple-select-label" >isEmployed</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={isEmployed}
    label="isEmployed"
    onChange={(e)=>setIsEmployed (e.target.value)}
  >
    <MenuItem value={"Yes"}>YES</MenuItem>
    <MenuItem value={"No"}>No</MenuItem>
  </Select>
</FormControl>
<FormControl sx={{ m: 1 }}>
  <InputLabel id="demo-simple-select-label" >isStudent</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={isStudent}
    label="Program"
    onChange={(e)=>setIsStudent(e.target.value)}
  >
    <MenuItem value={"Yes"}>YES</MenuItem>
    <MenuItem value={"No"}>No</MenuItem>

  </Select>
</FormControl>
        
       
   
       
      </div>
    </Box>
        
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmission}>Submit</Button>
        </DialogActions>
        
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={openFilePopup}
        onClose={handleClose}
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
          
          
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
 
      <input type="file" name="file_url" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to Upload</p>
			)}
			
		</div>
     
    </Box>
        
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClickFClose}>Close</Button>
          <Button onClick={handleFSubmission}>Submit</Button>
        </DialogActions>
        
      </Dialog>

    </React.Fragment>
  );
}