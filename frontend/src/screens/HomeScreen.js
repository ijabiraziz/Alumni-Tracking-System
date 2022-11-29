import "./../styles/HomeScreen.css";
import Main from "../components/Main";
import Right from "../components/Right";
import React, { useState } from 'react'
import Logo from '../components/Logo';
import { SidebarData } from "../data/data";
import Reports from "../components/Reports";
import Search from "../components/Search";
import AlumniList from "../components/AlumniList";
import Setting from "../components/Setting";


function HomeScreen() {
  const [selected, setSelected]= useState(0)
  
  
  const sidebarClickHandler = (index) =>{
    setSelected(index);
  }
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
        :selected==3? <AlumniList header={'All Alumnis'}/>
        :selected==4? <AlumniList header={'Dashboard'}/>
        :selected==5? <AlumniList header={'Dashboard'}/>
        :selected==6? <AlumniList header={'Dashboard'}/>
        :selected==7? <Setting />
        :<div>8</div>
      }


     
      {/* Right  */}
     <Right/>
    </div>
  );
}

export default HomeScreen;
