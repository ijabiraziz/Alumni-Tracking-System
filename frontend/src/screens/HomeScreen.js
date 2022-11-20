import "./../styles/HomeScreen.css";
import Main from "../components/Main";
import Right from "../components/Right";
import React, { useState } from 'react'
import Logo from '../components/Logo';
import { SidebarData } from "../data/data";


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
        :selected==1? <div>1</div>
        :selected==2? <div>2</div>
        :selected==3? <div>3</div>
        :selected==4? <div>4</div>
        :selected==5? <div>5</div>
        :selected==6? <div>6</div>
        :selected==7? <div>7</div>
        :<div>8</div>
      }


     
      {/* Right  */}
     <Right/>
    </div>
  );
}

export default HomeScreen;
