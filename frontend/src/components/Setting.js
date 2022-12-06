
import React, {useState,useEffect} from 'react';
import {Form, Row, Col } from 'react-bootstrap';

import {useDispatch, useSelector} from 'react-redux';
import { getUserDetails, updateUserProfile  } from '../actions/UserActions'; 
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {USER_UPDATE_PROFILE_RESET} from '../constants/UserConstants'

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
import { Button } from '@mui/material';
import Box from '@mui/material/Box';


function Setting() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [showPassword,setShowPassword] = React.useState(false);

    const dispatch = useDispatch()
    const history = useNavigate();
    const location = useLocation();

    const userDetails = useSelector (state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector (state => state.userLogin)
    const { userInfo} = userLogin

    const userUpdateProfile = useSelector (state => state.userUpdateProfile)
    const { success} = userUpdateProfile

    

    useEffect (()=>{
      if (!userInfo){
        history('/login')
      }else{
        if (!user || !user.name || success){
            dispatch({type:USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
        }else{
            setName(user.name)
            setEmail(user.email)
        }
      }
    }, [dispatch, history, userInfo, user, success])


    const submitHandler = (e) => {
      e.preventDefault()
      if (password != confirmPassword){
        setMessage('Password do not match')
      }else {
      dispatch(updateUserProfile({
        'id':user._id,
        'name': name,
        'email': email,
        'password': password

    }))}
    }


  return (
    <Row>
        <Col md={3}>
        <Form >
        <Form.Group controlId = 'name'>
   

<FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            label="Name"
          />
        </FormControl>
        
          </Form.Group>

          <Form.Group controlId = 'email'>
          <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            label="Email"
          />
        </FormControl>
          </Form.Group>

          <Form.Group controlId = 'password'>
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
                
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
          </Form.Group>

          <Form.Group controlId = 'passwordConfirm'>
        

<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e)=>setShowPassword(!showPassword)}
                
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>


          </Form.Group>

        </Form>

        </Col>


        <Box
  display="flex"
  justifyContent="center"
  alignItems="center"

>
<Button variant="outlined" size="large"  onClick={submitHandler} >
          Update Profile
        </Button>
</Box>
    </Row>
    
  )
}

export default Setting