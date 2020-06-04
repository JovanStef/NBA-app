import React from 'react';
import {Link} from 'react-router-dom';

import './header.css';
import FontAwesome from 'react-fontawesome';

import SideNav from './SideNav/sideNav';

const Header = (props)=>{

    const sideNav = ()=>(
        <div className="bars">
            <FontAwesome name="bars"
            onClick = {props.onOpenNav}
            style={{
                color:'white',
                padding:'10px',
                cursor:'pointer'
            }}
            />
        </div>
    )

    const logo=()=> (
            <Link to="/" >
            <img alt="nba logo" src="/images/nba_logo.png" className="logo"/>
            </Link>
        )
    
    return(
        <header className="header">
            <SideNav {...props}/>
            <div className="headerOpt">
                {sideNav()}
        {logo()}
            </div>
        </header>
    )
}

export default Header;