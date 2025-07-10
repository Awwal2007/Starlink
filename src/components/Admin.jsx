import React, {useEffect, useState} from 'react'
import { jwtDecode } from 'jwt-decode';
import { Link, } from 'react-router-dom';

import DashNav from './DashNav'

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import home from '../assets/home.svg'
// import order from '../assets/order.svg'
// import subscription from '../assets/subscription.png'
// import billing from '../assets/billing.svg'
// import message from '../assets/message.svg'
// import settings from '../assets/settings.svg'

const Admin = () => {
    const [profile, setProfile] = useState("")
    const [messages, setMessages] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;   
    
      useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("accessToken"));
        // console.log(token);
        
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
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${baseUrl}/message`,{
                    headers:{
                        "Authorization" : `Bearer ${token}`                        
                    }
                }); // Update to your actual API URL
                const data = await res.json();
                console.log(data.data);
                
                setMessages(data.data);
            } catch (error) {
                console.error('Failed to load messages:', error);
            }
        };

        fetchMessages();
      },[baseUrl]);


  return (
    <div>
        <div  className="topbar">
            <a href='' style={{flex:"1", fontWeight: "700", fontSize: "25px", marginLeft: "25px", textDecoration: "none", color:"white"}}>
                STARLINK
            </a>
            <div className='topbar-middle'>
                <Link>
                    ACCOUNT
                </Link>
                <Link>SHOP</Link>
                <Link>HELP CENTER</Link>
            </div>
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
            <Link to="/admin" className={`${"active"} button`}>
                
                <img className='icon-white' src={home} alt="" />
                <div id="d-none" style={{display: "inline", marginLeft: "15px", color: "var(--icon-color)"}}>Home</div>
            </Link>
            {/* <Link to="/subscription" className={`${"subscriptionP"} button`}>
                <img style={{width: "20px"}} className='icon-white' src={subscription} alt="" />
                <div id="d-none" style={{display: "inline", marginLeft: "15px", color: "var(--icon-color)"}}>Subscriptions</div>
            </Link>
            <Link to="/order" className={`${"orderP"} button`}>
                
                <img className='icon-white' src={order} alt="" />
                <div id="d-none" style={{display: "inline", marginLeft: "15px", color: "var(--icon-color)"}}>Orders</div>
            </Link>
            <Link  className={`${"billing"} button`}>
                
                <img className='icon-white' src={billing} alt="" />
                <div id="d-none" style={{display: "inline", marginLeft: "15px", color: "var(--icon-color)"}}>Billing</div>
            </Link> */}
            {/* <Link to={`/admin-message${userId}`} className={`${"messageP"} button`}>
                
                <img className='icon-white' src={message} alt="" />
                <div id="d-none" style={{display: "inline", marginLeft: "15px", color: "var(--icon-color)"}}>Messages</div>
            </Link> */}
            {/* <Link  className={`${"billing"} button`}>
                
                <img className='icon-white' src={settings} alt="" />
                <div className="d-none" style={{display: "inline", marginLeft: "15px", color: "var(--icon-color)"}}>Settings</div>
            </Link> */}
        </div>
        <div style={{marginBottom: "350px"}} className="main">
            <h2 style={{marginTop: "70px"}}>Admin</h2>
            <p>Admin Overview</p>
            <div className="messages-overview">
                <h3>User Messages</h3>
                {!messages ? (
                    <p>No messages found.</p>
                    ) : (
                    <ul>
                        {Object.values(
                            messages.reduce((acc, msg) => {
                                const existing = acc[msg.userId];
                                // If there's no message for this user yet, or the current one is newer, replace it
                                if (!existing || new Date(msg.date) > new Date(existing.date)) {
                                acc[msg.userId] = msg;
                                }
                                return acc;
                            }, {})
                            )
                            .map((msg) => (
                                <Link to={`/admin-message/${msg.userId}`} key={msg._id} style={{marginBottom: "10px", display: "block"}}>
                                <strong>{msg.userName}</strong>: {msg.message}
                                <br />
                                <small>{new Date(msg.date).toLocaleString()}</small>
                                </Link>
                            ))}
                    </ul>
                )}
            </div>

        </div>
    </div>
  )
}

export default Admin
