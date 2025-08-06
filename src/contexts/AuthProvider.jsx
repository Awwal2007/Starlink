// src/context/AuthProvider.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "./authContext";

const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem("accessToken");

      if (!storedToken) return;

      try {
        const token = JSON.parse(storedToken);
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (payload.exp && payload.exp < currentTime) {
          // Token expired
          localStorage.removeItem("accessToken");
          toast.error("Session expired. Please log in again.");
          navigate("/signin");
        }
      } catch (err) {
        console.error("Token parsing error", err);
        localStorage.removeItem("accessToken");
        navigate("/signin");
      }
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, [navigate]);


  const [users, setUsers] = useState([]);
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [verificationData, setVerificationData] = useState();
  const [signingIn, setSigningIn] = useState(false);
  const [adminSigningIn, setAdminSigningIn] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${baseUrl}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (formData, navigate) => {
    setSigningIn(true);
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message, accessToken, status, user } = await res.json();
      console.log(status);
      
      if (status === "success") {
        toast.success(message);
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
    } finally {
      setSigningIn(false);
    }
  };

  const adminSignIn = async (formData, navigate) => {
    setAdminSigningIn(true);
    try {
      const res = await fetch(`${baseUrl}/auth/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message, accessToken, status } = await res.json();
      if (message.role === "admin") return;
      if (status === "success") {
        toast.success(message);
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAdminSigningIn(false);
    }
  };

  const isAuthenticated = () => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) return false;

    let accessToken;
    try {
      accessToken = JSON.parse(storedToken);
    } catch (error) {
      console.log(error);
      return false;
    }

    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp && payload.exp > currentTime;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const verifyAccount = async (token) => {
    setVerifyingAccount(true);
    try {
      const res = await axios.post(`${baseUrl}/auth/verify/${token}`);
      const data = res.data;
      if (res.status === 200) {
        setVerificationData(data);
      }
    } catch (error) {
      setVerificationData(error.response.data);
      console.log(error.response.data.message);
    } finally {
      setVerifyingAccount(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    toast.success("Logged out successfully");
    navigate("/");
  };


  const value = {
    users,
    signingIn,
    adminSigningIn,
    verifyingAccount,
    verificationData,
    fetchUsers,
    isAuthenticated,
    signin,
    adminSignIn,
    verifyAccount,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
