import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

import "./css/DashNav.css"

// import bgImage from '../assets/account_home_illustration.png'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import home from '../assets/home.svg'
import order from '../assets/order.svg'
import subscription from '../assets/subscription.png'
import billing from '../assets/billing.svg'
import message from '../assets/message.svg'
import settings from '../assets/settings.svg'

import logo from "../assets/logo_white.png"

import useMediaQuery from './MediaQuery';


const DashNav = ({dashboardP, messageP, orderP, subscriptionP, billingP }) => {
  // const [active, setActive] = useState("")
  const [profile, setProfile] = useState("")
  const isMobile = useMediaQuery('(max-width: 750px)')
  useEffect(()=>{
    const token = localStorage.getItem("accessToken");
    if(token){
      try {
        const decoded = jwtDecode(token)
        const fullname = decoded.name
        const [first, last] = fullname.split(" ");
        const userProfile = `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
        
        setProfile(userProfile)
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  },[]);

  return (
    <>
      <div  className="topbar">
            <Link to='/' style={{flex:"1", fontWeight: "700", fontSize: "25px", marginLeft: "25px", textDecoration: "none", color:"white"}}>
              <img style={{height: "20px"}} src={logo} alt="" />
            </Link>
            {isMobile? "": 
              <div className='topbar-middle'>
                <Link>
                    ACCOUNT
                </Link>
                <Link>SHOP</Link>
                <Link>HELP CENTER</Link>
              </div>
            }
            <div style={{display: "flex", alignItems: "center", flexGrow: "0.3"}}>
                <ShoppingCartOutlinedIcon/>
                <div className='profile-h'>
                  <span className='profile'>
                    {profile || "??"}
                  </span>
                </div>
            </div>
        </div>


        <div className="sidebar">
            <Link to="/dashboard" className={`${dashboardP} button`}>
                {/* <HomeOutlinedIcon /> */}
                <img className='icon-white' src={home} alt="" />
                {isMobile ? "" : <div id="d-none" style={{ marginLeft: "15px", color: "var(--icon-color)"}}>Home</div>}
            </Link>
            <Link to="/subscription" className={`${subscriptionP} button`}>
                {/* <CardMembershipOutlinedIcon /> */}
                <img style={{width: "20px"}} className='icon-white' src={subscription} alt="" />
                <div id="d-none" style={{ marginLeft: "15px", color: "var(--icon-color)"}}>Subscriptions</div>
            </Link>
            <Link to="/order" className={`${orderP} button`}>
                {/* <LocalMallOutlinedIcon /> */}
                <img className='icon-white' src={order} alt="" />
                <div id="d-none" style={{ marginLeft: "15px", color: "var(--icon-color)"}}>Orders</div>
            </Link>
            <Link to="/billing" className={`${billingP} button`}>
                {/* <AccountBalanceWalletOutlinedIcon /> */}
                <img className='icon-white' src={billing} alt="" />
                <div id="d-none" style={{ marginLeft: "15px", color: "var(--icon-color)"}}>Billing</div>
            </Link>
            <Link to="/message" className={`${messageP} button`}>
                {/* <EmailOutlinedIcon /> */}
                <img className='icon-white' src={message} alt="" />
                <div id="d-none" style={{ marginLeft: "15px", color: "var(--icon-color)"}}>Messages</div>
            </Link>
            <Link  className={`${"settings"} button`}>
                {/* <SettingsOutlinedIcon /> */}
                <img className='icon-white' src={settings} alt="" />
                <div id="d-none" style={{ marginLeft: "15px", color: "var(--icon-color)"}}>Settings</div>
            </Link>
        </div>


        {/* <div className='bg-container'>
            <img className='bg-img' src={bgImage} alt="round-bg" />
        </div> */}
    </>
  )
}

export default DashNav