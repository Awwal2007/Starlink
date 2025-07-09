import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from './MediaQuery';

import logo from "../assets/logo_white.png"

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    // const [matches, setMatches] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className='nav-container'>
        <div className='nav-side-1'>
            {/* <h2>STARLINK</h2> */}
            <img style={{height: "30px"}} src={logo} alt="" />
        </div>
        {/* <div className='nav-side-2'>
            <a className='nav-link' href="">RESIDENTIAL</a>
            <a className='nav-link' href="">ROAM</a>
        </div> */}
        <div className='nav-side-3'>
            <a className='nav-link' href="">PERSONAL</a>
            <div style={{
                width: "2px",
                height: "15px",
                backgroundColor: "white",
                display: "inline-block"
            }}></div>
            <a className='nav-link' href="">BUSINESS</a>
            {isMobile ? <MenuIcon 
                className='arm-burger' 
                onMouseEnter={() => setShowLinks(true)}
                onMouseLeave={() => setShowLinks(false)}
             /> : ""}
            {showLinks && (
                <div
                    className='dropdown-links'
                    onMouseEnter={() => setShowLinks(true)}
                    onMouseLeave={() => setShowLinks(false)}
                >
                    <a className='navbar-link' href="#">RESIDENTIAL</a>
                    <a className='navbar-link' href="#">ROAM</a>
                    <a className='navbar-link' href="#">PERSONAL</a>
                    <a className='navbar-link' href="#">BUSINESS</a>
                </div>
            )}
        </div>
    </div>
  )
}

export default Navbar