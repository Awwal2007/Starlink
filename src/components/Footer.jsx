import React from 'react'
import "./css/Footer.css"
import XLogo from "../assets/xLogo.svg"

const Footer = () => {
  return (
    <footer>
        <div className='footer-child-1'>
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">Satellite Operators</a>
            <a href="#" className="footer-link">Authorized Resellers</a>
            <a href="#" className="footer-link">Privacy &amp; Legal</a>
            <a href="#" className="footer-link">Privacy Preferences</a>
            <a href="#" className="footer-link">Consumer Code of Practice</a>
        </div>

        <div className="footer-child-2">
            <div>
                <img className="x-logo" src={XLogo} alt="" />
            </div>
            <span>Starlink © 2025 &nbsp;&nbsp; Starlink is a division of SpaceX. Visit us at 
                <a href="#" className="x-link"> spacex.com</a>
            </span>
        </div>
    </footer>
  )
}

export default Footer