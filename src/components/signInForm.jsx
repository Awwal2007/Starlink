import React, { useState, useContext } from "react";
import "../Index.css";

import { authContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {

    const { signin, signingIn } = useContext(authContext);
    const navigate = useNavigate();
    const defaultData = {
        email: "",
        password: ""
    };


  
    const [formData, setFormData] = useState(defaultData);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signin(formData, navigate);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>SIGN IN</h1>
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInput}
                required
                />
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInput}
                required
                />
                <button type="submit" className="signIn" disabled={signingIn}>
                {signingIn ? "Signing In..." : "Sign In"}
                </button>
            </form>

            <div className="form-side">
                <button className="form-side-button">
                <div className="form-side-child">
                    <p style={{ fontSize: "15px" }}>Activate Your Starlink</p>
                    <p style={{ color: "rgba(255, 255, 255, 0.418)" }}>
                    Received a Starlink Kit and ready to set it up
                    </p>
                </div>
                </button>

                <button className="form-side-button">
                <div className="form-side-child">
                    <p style={{ fontSize: "15px" }}>Order Starlink</p>
                    <p style={{ color: "rgba(255, 255, 255, 0.418)" }}>
                    30 days trial with full refund if not satisfied
                    </p>
                </div>
                </button>

                <button className="form-side-button">
                <div className="form-side-child">
                    <p style={{ fontSize: "15px" }}>
                    Visit our support center if not satisfied
                    </p>
                    <p style={{ color: "rgba(255, 255, 255, 0.418)" }}>
                    Get guidance from our support team
                    </p>
                </div>
                </button>

                <button className="form-side-button">
                <div className="form-side-child">
                    <p style={{ fontSize: "15px" }}>Checkout our customer stories</p>
                    <p style={{ color: "rgba(255, 255, 255, 0.418)" }}>
                    Learn more about our community
                    </p>
                </div>
                </button>
            </div>
        </div>
    );
};

export default SigninForm;
