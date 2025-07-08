import React from 'react'
import "./css/Dashboard.css"

import { Link } from 'react-router-dom';

import bgImage from '../assets/account_home_illustration.png'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// import home from '../assets/home.svg'
import order from '../assets/order.svg'
import subscription from '../assets/subscription.png'
import billing from '../assets/billing.svg'
import message from '../assets/message.svg'
import settings from '../assets/settings.svg'
import DashNav from './DashNav';

import useMediaQuery from './MediaQuery';

const Dashboard = () => {
    const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className='dashboard'>

       <DashNav dashboardP="active"/>

        <div className='bg-container'>
            <img className='bg-img' src={bgImage} alt="round-bg" />
        </div>

        

        <div className="main">
            <div className="warning-banner">
                <span style={{alignItems:"center", display: "flex"}}>
                    <ErrorOutlineOutlinedIcon/> 
                    <div style={isMobile ? {fontSize: "12px", marginLeft: "10px"} : {marginLeft: "10px"}}>Your service has been disabled due to a billing issue. Please ensure all bills are paid.</div>
                </span>
                <Link to="/billing">
                    <button className='view-billing-button' >View Billing</button>
                </Link>
            </div>
            <h1 style={{marginBottom: "15px"}}>Home</h1>
            <p>Muhammad Amir • ACC-3046416-28749-19</p>

            <div className="balance-box">
                <div style={{flexGrow: "2"}}>
                    <h2 style={{fontSize: "15px", fontWeight: "400", marginBottom: "20px"}}>Balance Due</h2>
                    <div className="balance-amount">
                        <div style={{display: 'inline', marginRight:"8px"}}>
                            £0.00 
                        </div>
                        <span className="Unpaid">
                            <ErrorOutlineOutlinedIcon />
                        </span>
                    </div>
                </div>
                <div >
                    <button className="pay-button">Pay</button>
                </div>
            </div>

            <div className="dashboard-cards">
                <div style={{flex: "calc(100%)", alignItems: "center"}} className="dashboard-card">
                    {/* <CardMembershipOutlinedIcon /> */}
                    <img style={{width: "20px", height: "20px"}} className='icon-white' src={subscription} alt="" />
                    <div style={{marginLeft: "20px"}}>
                        <h3>Your Subscription</h3>
                        <p>Manage Starlink service</p>
                    </div>
                </div>
                <div className="dashboard-card">
                    {/* <LocalMallOutlinedIcon />*/}
                    <img className='icon-white' src={order} alt="" />
                    <div style={{marginLeft: "20px"}}>
                        <h3>Orders</h3>
                        <p>View order history</p>
                    </div>
                </div>
                <div className="dashboard-card">
                    {/* <AccountBalanceWalletOutlinedIcon /> */}
                    <img className='icon-white' src={billing} alt="" />
                    <div style={{marginLeft: "20px"}}>
                        <h3>Billing</h3>
                        <p>View invoices and payments</p>
                    </div>
                </div>
                <div className="dashboard-card">
                    {/* <EmailOutlinedIcon /> */}
                    <img className='icon-white' src={message} alt="" />
                    <div style={{marginLeft:"20px"}}>
                        <h3>Messages</h3>
                        <p>View support tickets</p>
                    </div>
                </div>
                <div className="dashboard-card">
                    {/* <SettingsOutlinedIcon /> */}
                    <img className='icon-white' src={settings} alt="" />
                    <div style={{marginLeft: "20px"}}>
                        <h3>Settings</h3>
                        <p>Update profile and users</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>

  )
}

export default Dashboard