import React, { useState, useContext } from "react";
import "../Index.css";
import { authContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLoginForm = () => {
    const { signin, singingIn } = useContext(authContext);
    const [signingIn, setSigningIn] = useState(false)
    const navigate = useNavigate();
    const defaultData = {
        email: "",
        password: "",
        adminKey: ""  // Added admin key field
    };

    const [formData, setFormData] = useState(defaultData);
    const [error, setError] = useState("");
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        setSigningIn(true);
        e.preventDefault();

        const adminKey = import.meta.env.VITE_APP_ADMIN_KEY
        
        // Basic client-side validation for admin key
        if (formData.adminKey === adminKey) {
            
            signin(formData, navigate); // Passing true to indicate admin login
            setError("");
            return true;

        }else{
            setError("Invalid admin credentials");
            setSigningIn(false);
            return false;
        }
        
        // Proceed with admin sign in
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>ADMIN LOGIN</h1>
                {error && <p className="error-message">{error}</p>}
                
                <input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
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
                
                <input
                    type="password"
                    name="adminKey"
                    placeholder="Admin Secret Key"
                    value={formData.adminKey}
                    onChange={handleInput}
                    required
                />
                
                <button type="submit" className="signIn" disabled={singingIn}>
                    {singingIn || signingIn ? "Signing In..." : "Sign In As Admin"}
                </button>
            </form>

            <div className="form-side">
                <div className="admin-info">
                    <h3>Admin Portal</h3>
                    <p>Restricted access to authorized personnel only</p>
                    <ul>
                        <li>Manage user accounts</li>
                        <li>View system analytics</li>
                        <li>Configure application settings</li>
                        <li>Access support tickets</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginForm;