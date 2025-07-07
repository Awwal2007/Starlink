import React from 'react'
import "./css/Subscription.css"

import { Link } from 'react-router-dom';

// import bgImage from '../assets/account_home_illustration.png'
// import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
// import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
// import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// import home from '../assets/home.svg'
// import order from '../assets/order.svg'
// import subscription from '../assets/subscription.png'
// import billing from '../assets/billing.svg'
// import message from '../assets/message.svg'
// import settings from '../assets/settings.svg'
import DashNav from './DashNav';

const Subscription = () => {
  return (
    <div className='dashboard'>

        <DashNav subscriptionP={"active"} />
        

        <div className="main">
            <div style={{marginBottom: "15px", marginTop:"80px", display: "flex", justifyContent: "space-between"}}>
                <h1 style={{display: "inline"}}>Subscriptions</h1>
                <button className='add-subscription-btn'>Add Subscription</button>
            </div>

            <div className="subscription-container">
            <table className="subscription-table">
                <thead>
                    <tr>
                        <th>Subscription</th>
                        <th>Service Location</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                <tr>
                    <td>Residential</td>
                    <td>Kilburn Ln</td>
                    <td>
                    <span className="status-badge suspended">Suspended</span>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="pagination">
                <div className="rows-selector">
                <span>Rows per page:</span>
                <select>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
                </div>
                <div className="page-info">
                <span>1 - 1 of 1</span>
                <button disabled>{"\u25C0"}</button>
                <button disabled>{"\u25B6"}</button>
                </div>
            </div>
            </div>

        </div>
    </div>

  )
}

export default Subscription