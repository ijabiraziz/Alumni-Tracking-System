import '../styles/util.css'
import '../styles/main.css'
import React, {useState,useEffect} from 'react';
import logo from '../assets/images/auth-image.png'
import axios from 'axios';


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [password, setPassword] = useState('')

    const  submitHandler = (e) => {
        var bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password',password);


        e.preventDefault()

        const config =  {

            headers :{
                'Content-type':'multipart/form-data'
            }
        }
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/register/",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
        
      
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
                    <select className="login_input input100" type="text" name="department" placeholder="Department">

                        <option 
                         value={department}
                         onChange={(e)=> setDepartment(e.target.value)}
                        >
                            Computer Science</option>
                        <option
                         value={department}
                         onChange={(e)=> setDepartment(e.target.value)}
                        >Politicla Science</option>
                        <option
                         value={department}
                         onChange={(e)=> setDepartment(e.target.value)}
                        >Bio Tech</option>
                    </select>


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
                    <a className="txt2" href="#">
                        Already have an Account? Login Here
                        <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default RegisterScreen	
	
