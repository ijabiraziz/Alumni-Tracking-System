import '../styles/util.css'
import '../styles/main.css'
import React, {useState,useEffect} from 'react';
import logo from '../assets/images/auth-image.png'
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Loader from '../components/Loader';
import Message from '../components/Message';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/UserActions'; 
import { listDepartments } from '../actions/DepartmentActions'; 


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [department_id, setDepartment_id] = useState(1)

    const [password, setPassword] = useState('')


    const dispatch = useDispatch()
    const history = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector (state => state.userRegister)
    const {error, loading, userInfo} = userRegister
    const departmentList = useSelector(state=>state.listDepartments)
    const {d_error, d_loading, departments} = departmentList

    useEffect (()=>{

        dispatch(listDepartments())
      if (userInfo){
        history(redirect)
      }
    }, [history, userInfo, redirect])

    function getIdByName(name) {
        const obj = departments.find(item => item.name === name);
        return obj ? obj.id : null;
      }

    const  submitHandler = (e) => {
        e.preventDefault()
        setDepartment_id(getIdByName(department))
        dispatch(register(name,department_id,email,password))
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
                    Member SignUp
                </span>

                <div className="wrap-input100 validate-input" >
                    <input className="login_input input100" type="text" name="name" placeholder="Name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </span>
                </div>
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

                <div className="wrap-input100 validate-input" >
                {d_loading ? <Loader/>
       : d_error ? <Message variant='danger'> {d_error}</Message>
       :
                   
                    <select className="login_input input100" type="text" name="department_id" placeholder="Department"
                    value={department}
                    onChange={(e)=> setDepartment(e.target.value)}
                    >
                        
       {departments.map(deptt =>(
           <option key={deptt.id} 
           value={deptt.name}
           >                {deptt.name}
           </option>
       ))}
                    </select>
}

                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <i className="fa fa-building" aria-hidden="true"></i>
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
                        Register
                    </button>
                </div>

                <div className="text-center p-t-60">
                Already have an Account?
                    <Link className="txt2" to="/login">
                         Login Here
                        <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                    </Link>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default RegisterScreen	
	
