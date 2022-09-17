import React, { useState } from 'react'
import Logo from './Logo';
import { SidebarData } from "../data/data";
import { Link } from 'react-router-dom';

function Sidebar({loc}) {

  const [selected, setSelected]= useState(loc)
 
  return (
    <aside>
        <Logo/>
      <div className='sidebar'>

        {SidebarData.map((item, index)=>{
           return( <Link to={item.linkTo} key={index} className={selected===index? 'active':''}
           onClick={()=>setSelected(index)}>
            <span >{item.icon}</span>
            <h3>{item.heading}</h3>
          </Link>
        )})}
      </div>
    </aside>

  )
}

export default Sidebar