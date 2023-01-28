import Button from '@mui/material/Button';
import  {TextField} from '@mui/material';
import { listDepartments } from '../actions/DepartmentActions'; 
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, {useState,useEffect} from 'react';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { listBatches } from '../actions/AlumniActions';
import { listPrograms } from '../actions/AlumniActions';
import { retriveAlumni } from '../actions/AlumniActions';
import { updateAlumni } from '../actions/AlumniActions';

export default function UpdateAlumni() {

  const dispatch = useDispatch()
  const history = useNavigate();

  const {hash} = useParams()
  


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

  const ret_alumni = useSelector(state=>state.retriveAlumni)
  const { error, alumni} = ret_alumni

  function getIdByName(list,name) {
    const obj = list.find(item => item.name === name);
    return obj ? obj.id : null;
  }
  function getNameById(list,id) {
    const obj = list.find(item => item.id === id);
    return obj ? obj.name : null;
  }


  useEffect(()=>{
    if(alumni)
{setName(alumni.name)
setEmail(alumni.email)
setPassword(alumni.password)
const dept_name = getNameById(departments,alumni.department)
setDepartment(dept_name)
setphoneNo(alumni.phone)
setLocation(alumni.location)
setCompany(alumni.company)
setPosition(alumni.position)
setCgpa(alumni.cgpa)
const batch_n = getNameById(batch_list,alumni.batch)
setBatch(batch_n)
const program_n = getNameById(program_list,alumni.program)

setProgram(program_n)
setIsEmployed(alumni.is_employed)
setIsStudent(alumni.is_student)}

  },[alumni])

  


  useEffect (()=>{
    dispatch(listDepartments())
    dispatch(listBatches())
    dispatch(listPrograms())
    dispatch(retriveAlumni(hash))

}, [])

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };




  
	const handleSubmission = () => {
    const batch_id= getIdByName(batch_list, batch)
    const program_id = getIdByName(program_list, program)
    const department_id = getIdByName(departments, department)

    dispatch(updateAlumni(
      hash,
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
	};



  return (
    <React.Fragment  >  
      {error?<h1>The User with This Profile Is Gone</h1>:<>
        <Box sx={{ display: 'flex', flexWrap: 'wrap',ml:10,mr:10,mt:2 }}>
        <h1>Update Your Profile:</h1>
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
        
      
       
    
      
     
     
    <Box
  display="flex"
  justifyContent="center"
  alignItems="center"

 
>
<Button variant="outlined" size="large" onClick={handleSubmission} >
          Update
        </Button>
</Box>
</>
}
    </React.Fragment>
  );
}