import React, {useState, useEffect} from 'react'


import { Link } from 'react-router-dom'
import "./css/Home.css"

import logo from "../assets/logo_white.png"
import heroimg from "../assets/home_b_hero_d.webp"
import conectImage from "../assets/imgi_16_home_b_feature1_d.webp"
import starlinkImage from "../assets/IMG-20250707-WA0260.jpg"
import background from "../assets/imgi_41_home_illustriation2_d.webp"
import flexible from "../assets/IMG-20250707-WA0254.jpg"
import engineerImg from "../assets/home_feature3_d.webp"

const Home = () => {
    const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50); // Change `50` to whatever threshold you want
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className='body' style={{backgroundImage: `url(${background})`, backgroundAttachment: "fixed", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}>
        {/* <div className="top-banner">
            1 month of FREE service upon activation between May 20th and June 16th. Residential plans only.
        </div> */}

        <section style={{background: `url(${heroimg})`, backgroundAttachment: "", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundColor: "black"}}>
            <nav className={`navbar ${
      scrolled ? 'scrolled' : 'transparent'
    }`}>
                <div className="navbar-left">
                    <Link>
                        <img className="logo" src={logo} alt="Starlink"/>
                    </Link>
                    <ul className="nav-links-left">
                    <li><a href="#" className="active">RESIDENTIAL</a></li>
                    <li><a href="#">ROAM</a></li>
                    </ul>
                </div>
            
                <div className="navbar-right">
                    <ul className="nav-links-right">
                    <li><a href="https://www.starlinkuk.com/">PERSONAL</a></li>
                    <li className="nav-divider">|</li>
                    <li><a href="#">BUSINESS</a></li>
                    </ul>
                    
                    <button className="menu-toggle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                    <i className="fas fa-bars"></i>
                    </button>
                </div>
            </nav>

            
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">MENU</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                
                <div className="offcanvas-body">
                    <ul className="offcanvas-menu">
                    <li><a href="#">US</a></li>
                    <li><Link to="/signin">SIGN IN</Link></li>
                    <li><a href="#">HELP CENTER</a></li>
                    <li><a href="#">AVAILABILITY MAP</a></li>
                    <li><a href="#">SPECIFICATIONS</a></li>
                    <li><a href="#">SERVICE PLANS</a></li>
                    <li><a href="#">VIDEO GUIDES</a></li>
                    <li><a href="#">TECHNOLOGY</a></li>
                    <li><Link to="/admin-login">ADMIN</Link></li>
                    <li><a href="#">CUSTOMER STORIES</a></li>
                    </ul>
                </div>
            </div>

            <header className="hero-section">
                <h1>HIGH-SPEED INTERNET<br/>AROUND THE WORLD</h1>
                <p>Connect at home or on the go<br/>See <strong>speeds</strong> in your country</p>
                <a href="#" className="watch-btn">WATCH NOW <i className="fas fa-play"></i></a>
            </header>
        

            <section className="plans-section">
                <div className="plan-card">
                    <h2>RESIDENTIAL</h2>
                    <p>Connect at home with reliable high-speed internet for your household.</p>
                    <p className="price">Starting at <strong>NGN57,000/mo</strong> for service</p>
                    <div className="card-buttons">
                        <a href="#" className="btn primary">ORDER NOW</a>
                        <a href="#" className="btn secondary">LEARN MORE</a>
                    </div>
                </div>
                <div className="plan-card">
                    <h2>ROAM</h2>
                    <p>Connect while traveling anywhere in over 100 markets across the globe.</p>
                    <p className="price">Starting at <strong>NGN38,000/mo</strong> for service</p>
                    <div className="card-buttons">
                        <a href="#" className="btn primary">ORDER NOW</a>
                        <a href="#" className="btn secondary">LEARN MORE</a>
                    </div>
                </div>
            </section>
        </section>

            <section className="business-section">
                <h2>STARLINK FOR BUSINESSES AND POWER USERS</h2>
                <p>RELIABLE HIGH-SPEED INTERNET DESIGNED TO KEEP BUSINESSES CONNECTED. 
                <a href="#">LEARN MORE ›</a>
                </p>
            </section>
            
            
            <section className="connectivity-section" style={{background: `url(${conectImage})`, backgroundSize: "cover"}}>
                <div className="connectivity-content">
                <h2 className="connectivity-heading">
                    <div>CONNECTIVITY WHERE YOU</div>
                    <span>LEAST EXPECT IT</span>
                </h2>
                
                <div className="connectivity-subheading">
                    <p>Streaming, video calls, online gaming, remote working and more are now</p>
                    <p>possible in even the most remote locations thanks to the world's most</p>
                    <span className="connectivity-highlight">advanced internet system.</span>
                </div>
                </div>
            </section>

            
            <section className="online-minutes-section py-5">
                <div className="container">
                    <div className="row align-items-center">
                    
                    
                    <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0 position-relative">
                        <img src={starlinkImage} alt="Starlink Setup" className="img-fluid rounded"/>
                        <div className="play-circle">
                            <i className="fas fa-play"></i>
                        </div>
                    </div>
                    
                    
                    <div className="col-lg-6 text-white">
                        <h2 className="mb-3">GET ONLINE IN MINUTES</h2>
                        <p>Set up Starlink with just two steps. Instructions work in either order:</p>
                        <div className="steps my-3">
                            <p><strong>1 PLUG IT IN</strong></p>
                            <p><strong>2 POINT AT SKY</strong></p>
                        </div>
                        <p className="note mb-4">Starlink requires an unobstructed view of the sky. Download the Starlink app to determine your best install location.</p>
                        <div className="d-flex flex-wrap gap-3">
                            <a href="#" className="download-btn">DOWNLOAD FOR ANDROID ›</a>
                            <a href="#" className="download-btn">DOWNLOAD FOR IOS ›</a>
                        </div>
                    </div>

                    </div>
                </div>
            </section>

            
            <section style={{backgroundColor: "transparent"}}  className="service-plans-section">
                <div className="container-fluid px-0">
                    <div className="row g-0 align-items-center">
                    
                    
                        <div style={{backgroundColor: "transparent"}}  className="col-lg-6 d-flex align-items-center justify-content-center text-section">
                            <div className="text-white px-5 py-4 w-100" style={{maxWidth: "600px"}}>
                            <h2 className="mb-3 fw-bold">FLEXIBLE SERVICE PLANS</h2>
                            <p className="mb-0">Starlink offers flexible service plans everywhere. Check availability by entering your address <a href="#" className="text-decoration-underline text-white fw-semibold">here</a>.</p>
                            </div>
                        </div>

                        
                        <div className="col-lg-6">
                            <img src={flexible} alt="Flexible Service Plans" className="img-fluid w-100 h-100 object-fit-cover"/>
                        </div>

                    </div>
                </div>
            </section>

            
            <section style={{background: `url(${engineerImg})`}} className="engineered-section d-flex align-items-center text-white">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-6">
                        <h2 className="fw-bold mb-3">ENGINEERED BY SPACEX</h2>
                        <p className="mb-4">
                        As the world’s leading provider of launch services – and the only provider with an orbital className reusable rocket – SpaceX has deep experience with both spacecraft and on-orbit operations.
                        </p>
                        <a href="#" className="btn btn-outline-light">LEARN MORE</a>
                    </div>
                    </div>
                </div>
            </section>

            
            <section className="trial-section text-center text-white">
                <div className="container">
                    <h2 className="fw-bold">30 DAY TRIAL</h2>
                    <p className="mb-4">If not satisfied, return Starlink for a full refund.</p>

                    <div className="row justify-content-center align-items-center mb-3">
                    <div className="col-md-6 col-lg-4">
                        <label htmlFor="addressInput" className="form-label text-white text-start d-block">Service Address</label>
                        <div className="input-group">
                        <input type="text" className="form-control" id="addressInput" placeholder="TYPE AND SELECT"/>
                        <span className="input-group-text bg-dark text-white"><i className="bi bi-arrow-repeat"></i></span>
                        </div>
                    </div>
                    <div className="col-md-auto mt-3 mt-md-4 mt-lg-0">
                        <button className="btn btn-light px-4">ORDER NOW</button>
                    </div>
                    </div>

                    <a href="#" className="text-white text-decoration-underline small">VIEW AVAILABILITY & SPEEDS MAP</a>
                </div>

                <footer className="footer-links mt-5 pt-5 small text-muted">
                    <div className="container d-flex flex-wrap justify-content-between align-items-center">
                    <div className="footer-left mb-2">
                        <a href="#">Careers</a>
                        <a href="#">Satellite Operators</a>
                        <a href="#">Authorized Reseller</a>
                        <a href="#">Privacy & Legal</a>
                        <a href="#">Consumer Code of Practice</a>
                        <a href="#">Privacy Preferences</a>
                    </div>

                    <div className="footer-right mb-2 d-flex align-items-center">
                        <span className="me-2">Interested in staying up to date with Starlink?</span>
                        <input type="email" className="form-control form-control-sm me-2" placeholder="Email"/>
                        <button className="btn btn-link text-white text-uppercase">Sign Up</button>
                    </div>
                    </div>
                    <div className="container text-start mt-3">
                    <p className="mb-0 text-muted">&copy; Starlink 2025 — Starlink is a division of SpaceX. Visit us at <a href="https://spacex.com" className="text-white">spacex.com</a></p>
                    </div>
                </footer>
        </section>

    </div>
  
  )
}

export default Home