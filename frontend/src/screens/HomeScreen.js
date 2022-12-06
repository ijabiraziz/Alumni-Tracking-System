import "./../styles/HomeScreen.css";
import Main from "../components/Main";
import Right from "../components/Right";
import React, {useState,useEffect} from 'react';
import Logo from '../components/Logo';
import { SidebarData } from "../data/data";
import Reports from "../components/Reports";
import Search from "../components/Search";
import AlumniList from "../components/AlumniList";
import AllAlumniList from "../components/AllAlumniList";
import Setting from "../components/Setting";
import {logout} from '../actions/UserActions'
import {Navbar, Nav,Container, NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import BsAlumni from "../components/BsAlumniList";


import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import MsAlumniList from "../components/MsAlumniList";
import PhdAlumniList from "../components/PhdAlumniList";
function HomeScreen() {
  const [selected, setSelected]= useState(0)
  
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const history = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/'

  
  const sidebarClickHandler = (index) =>{
    setSelected(index);
  }
  const logoutHandler =  () =>{
    dispatch(logout())
  }


  useEffect (()=>{
    if (userInfo){
      history(redirect)
    }
    else{
      history('/login')
    }
  }, [ userInfo])


  return (
    
    <div className="container">
      {/* Sidebar */}
      <aside>
        <Logo/>
      <div className='sidebar'>
        {SidebarData.map((item, index)=>{
           return( <div   key={index} className={selected===index? 'react-a active':'react-a'}
           onClick={()=>{sidebarClickHandler(index)}}>
            <span >{item.icon}</span>
            <h3>{item.heading}</h3>
          </div>
        )})}
      </div>

    </aside>
      {/* Main */}

      {
        selected==0?  <Main header={'Dashboard'}/>
        :selected==1? <Reports header={'Reports'}/>
        :selected==2? <Search/>
        :selected==3? <AllAlumniList header={'All Alumnis'}/>
        :selected==4? <BsAlumni header={'BS Alumnis'}/>
        :selected==5? <MsAlumniList header={'MS Alumni'}/>
        :selected==6? <PhdAlumniList header={'PHD Aalumni'}/>
        :selected==7? <Setting />
        : logoutHandler()
      }


     
      {/* Right  */}
     <Right/>
    </div>
  );
}

export default HomeScreen;
