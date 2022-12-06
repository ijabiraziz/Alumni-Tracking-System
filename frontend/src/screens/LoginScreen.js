import axios from 'axios';

import '../styles/util.css'
import '../styles/main.css'

import logo from '../assets/images/auth-image.png'

import React, {useState,useEffect} from 'react';
import {Form, Button,Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../actions/UserActions'; 
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";


function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector (state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect (()=>{
      if (userInfo){
        history(redirect)
      }
    }, [history, userInfo, redirect])





    const  submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }

  return (
  <div className="limiter">
    <div className="container-login100">
        <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
                <img src={logo} alt="IMG"/>
            </div>

            <form onSubmit={submitHandler} className="login100-form validate-form">
                <span className="login100-form-title">
                    Member Login
                </span>

                <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <input className="login_input input100" type="text" name="email" placeholder="Email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                </div>

                <div className="wrap-input100 validate-input" data-validate = "Password is required">
                    <input className="input100" type="password" name="pass" placeholder="Password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                </div>
                
                <div className="container-login100-form-btn">
                    <button className="login_button login100-form-btn">
                        Login
                    </button>
                </div>

                <div className="text-center p-t-12">
                    <span className="txt1">
                        Forgot
                    </span>
                    <a className="txt2" href="#">
                        Username / Password?
                    </a>
                </div>

                <div className="text-center p-t-136">
                    <Link className="txt2" to="/register">
                        Create your Account
                        <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                    </Link>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default LoginScreen	
	
