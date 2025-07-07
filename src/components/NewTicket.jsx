// import React from 'react'
// import "./css/NewTicket.css"

// import { useState, useEffect, useRef } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { Link } from 'react-router-dom';
// import { toast } from "sonner";

// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
// import CircularProgress from '@mui/material/CircularProgress';



// const NewTicket = () => {
//     const [profile, setProfile] = useState("")
//     const [messageData, setMessageData] = useState({message: ""})
//     const [sendingMessage, setSendingMessage] = useState(false)
//     const chatRef = useRef(null);

//     const [messages, setMessages] = useState([
//         { sender: "user", text: ".." }
//     ]);
//     const [adminMessages, setAdminMessages] = useState([
//         { sender: "admin", text: "Hi! I'm a support chatbot for Starlink, and I'm here to help answer your Starlink questions." }
//     ]);

//     const baseUrl = import.meta.env.VITE_BASE_URL;

     
//     useEffect(()=>{
//         const token = localStorage.getItem("accessToken");
//         if(token){
//           try {
//             const decoded = jwtDecode(token)
//             const fullname = decoded.name
//             const [first, last] = fullname.split(" ");
//             const userProfile = `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
            
//             setProfile(userProfile)
//           } catch (error) {
//             console.error("Invalid token:", error);   
//           }
//         }
//     },[]);

//     useEffect(() => {
//         chatRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     useEffect(() => {
//         const fetchReplies = async () => {
//             try {
//             const token = JSON.parse(localStorage.getItem("accessToken"));
//             const res = await fetch(`${baseUrl}/message`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const data = await res.json();
//             setAdminMessages(data.adminMessages); // Structure depends on your backend
//             } catch (err) {
//                 console.error("Failed to fetch admin replies", err);

//             }
//         };

//         fetchReplies();
//     }, []);


//     const sendMessage = async ()=>{
//         const newUserMessage = messageData.message.trim();

//         if (!newUserMessage) {
//             toast.warning("Please enter a message before sending.");
//             return;
//         }

//         setMessages((prev) => [...prev, { sender: "user", text: newUserMessage }]);

//         try {
//             setSendingMessage(true)
//             const token = JSON.parse(localStorage.getItem("accessToken"));
            

//             const res = await fetch(`${baseUrl}/message`, {
//                 method: "POST",
//                 headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({message: newUserMessage}),
//             });

//             console.log("Sending:", JSON.stringify(messageData));

//             const {message, status, adminReply } = await res.json();
//             // const text = await res.text();
//             // console.error("Server response:", text);

//             console.log(status)
            

//             if(status === "success"){
//                 toast.success(message)

//                 if (adminReply) {
//                     setAdminMessages((prev) => [...prev, { sender: "admin", text: adminReply }]);
//                 }
//                 // window.location.reload();
//             }else{
//                 toast.error(message || "Something went wrong.");
//             }
//         } catch (error) {
//             console.log(error);       
//             toast.error("Failed to send");
//         } finally{
//             setSendingMessage(false)
//             setMessageData({ message: "" });
//         }
//     }
//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setMessageData(prev => ({ ...prev, [name]: value }));
//     };


//     const handleSubmit = (e)=>{
//         e.preventDefault();
//         if (!messageData.message?.trim()) {
//             toast.warning("Please enter a message.");
//             return;
//         }
//         sendMessage()
//     }
//   return (
//     <div>
//         <div  className="topbar">
//             <Link to="/" style={{flex:"1", fontWeight: "700", fontSize: "25px", marginLeft: "25px", textDecoration: "none", color:"white"}}>
//                 STARLINK
//             </Link>
//             <div className='topbar-middle'>
//                 <Link>
//                     ACCOUNT
//                 </Link>
//                 <Link>SHOP</Link>
//                 <Link>HELP CENTER</Link>
//             </div>
//             <div style={{display: "flex", alignItems: "center", flexGrow: "0.3"}}>
//                 <ShoppingCartOutlinedIcon/>
//                 <div className='profile-h'>
//                   <span className='profile'>
//                     {profile || "??"}
//                   </span>
//                 </div>
//             </div>
//         </div>
        
//         <div className="new-ticket-container">
//             <Link to="/message" className='top-message'>
//                 <span style={{marginRight: "10px"}}>{"<"}</span>
//                 <span>Messge</span>
//             </Link>
//             <div className="new-ticket-header">Starlink Assistant</div>
//             <div className="privacy-message">
//                 By sending a message containing personal information, you consent to Starlink collecting and sharing it as described in our <a href="#">Privacy Policy</a>.
//             </div>
//             <div className="chat-icon">
//                 <SmartToyOutlinedIcon />
//             </div>
//             <div className="chat-window">
//                 {[...adminMessages, ...messages]
//                     .sort((a, b) => a.timestamp - b.timestamp)  // If you have timestamps
//                     .map((msg, i) => (
//                         <div key={i} className={`${msg.sender}-message`}>
//                             {msg.text}
//                         </div>
//                     ))}
//                 <div ref={chatRef} />
//             </div>
//             <div className="input-area">
//                 <input onChange={handleInput} onKeyDown={(e)=>{
//                     if(e.key === "Enter"){
//                         handleSubmit(e);
//                     }
//                 }} value={messageData.message} name='message'  type="text" placeholder="Enter a message" />
//                 {sendingMessage ? (
//                     <CircularProgress size={24} style={{ marginLeft: '10px', color: '#fff' }} />
//                     ) : (
//                     <button onClick={handleSubmit} disabled={sendingMessage}>&#10148;</button>
//                 )}

//             </div>
//         </div>

//     </div>
//   )
// }

// export default NewTicket

import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import CircularProgress from '@mui/material/CircularProgress';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import './css/NewTicket.css';

const NewTicket = () => {
  const [profile, setProfile] = useState('');
  const [messageData, setMessageData] = useState({ message: '' });
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const [userId, setUserId] = useState();
  const chatRef = useRef(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Decode user profile initials
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const fullname = decoded.name || '';
        console.log(decoded.id);
        
        const [first, last] = fullname.split(' ');
        const userProfile = `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase();
        setProfile(userProfile);
        const userId = decoded.id
        setUserId(userId)
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);
  
  // Fetch chat history
 useEffect(() => {
  const fetchMessages = async () => {
    await fetchAdminMessages();
    await fetchUserMessages();
  };

  fetchMessages(); // Fetch immediately
  // const intervalId = setInterval(fetchMessages, 15000); // 15-second polling

  // return () => clearInterval(intervalId); // Cleanup
}, [userId]);

  const fetchUserMessages = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        const res = await fetch(`${baseUrl}/message/user-messages`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to fetch messages');
        
        const data = await res.json();
        console.log('API response:', data);
        console.log('API response:', data.data);
        
        
        // Ensure we always set an array
        const userMsgs = data.data;
        setMessages(userMsgs);
        
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        toast.error('Could not load chat history.');
        setMessages([]); // Fallback to empty array
      }
    };
  // Auto scroll to latest message
  // useEffect(() => {
  //   chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages, adminMessages]);

  const sendMessage = async () => {
    const newUserMessage = messageData.message;

    // Optimistic update
    // setMessages(prev => [...prev, { sender: 'user', text: newUserMessage }]);

    try {
      setSendingMessage(true);
      const token = JSON.parse(localStorage.getItem('accessToken'));
      // console.log(token);
      

      const res = await fetch(`${baseUrl}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(messageData)
      });

      const { message, status } = await res.json();

      if (!newUserMessage) {
        toast.warning('Please enter a message before sending.');
        return;
      }

      if (status === 'success') {
        toast.success('Message sent');
        // Optionally, re-fetch admin replies after delay
        setTimeout(() => {
          fetchAdminMessages(token);
          // window.location.reload();
          fetchUserMessages();
        }, 1500);
      } else {
        toast.error(message || 'Something went wrong.');
      }

      setMessageData({ message: '' });
    } catch (error) {
      console.log(error);
      toast.error('Failed to send message.');
    } finally {
      setSendingMessage(false);
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchAdminMessages = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('accessToken'));

      const res = await fetch(`${baseUrl}/message/admin-messages/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      const adminMsgs = data.data;
      setAdminMessages(adminMsgs);
    } catch (err) {
      console.error('Error updating admin replies:', err);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMessageData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageData.message?.trim()) {
      toast.warning('Please enter a message.');
      return;
    }
    sendMessage();
  };

  return (
    <div>
      <div className="topbar">
        <Link to="/" style={{ flex: "1", fontWeight: "700", fontSize: "25px", marginLeft: "25px", textDecoration: "none", color: "white" }}>
          STARLINK
        </Link>
        <div className="topbar-middle">
          <Link>ACCOUNT</Link>
          <Link>SHOP</Link>
          <Link>HELP CENTER</Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", flexGrow: "0.3" }}>
          <ShoppingCartOutlinedIcon />
          <div className="profile-h">
            <span className="profile">{profile || "??"}</span>
          </div>
        </div>
      </div>

      <div className="new-ticket-container">
        <Link to="/message" className="top-message">
          <span style={{ marginRight: "10px" }}>{"<"}</span>
          <span>Message</span>
        </Link>

        <div className="new-ticket-header">Starlink Assistant</div>

        <div className="privacy-message">
          By sending a message containing personal information, you consent to Starlink collecting and sharing it as described in our <a href="#">Privacy Policy</a>.
        </div>

        <div className="chat-icon">
          <SmartToyOutlinedIcon />
        </div>

        <div className="chat-window">
          <div className="a-message">
            {adminMessages.length === 0 && <div className="admin-message">No replies from admin yet.</div>}
            {messages.length === 0 && <div className="user-message">No message yet send new message now.</div>}
            {[...adminMessages, ...messages]
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((msg, i) => (
                  <div key={i} style={{display: "flex", width: "100%"}}>
                    <div style={{flexGrow: "1"}}
                      key={msg._id} 
                      className={adminMessages.some(m => m._id === msg._id) ? "admin-message" : "user-message"}
                    >
                      {msg.message}
                    </div>
                    <div>
                      {messages.some(m => m._id === msg._id) && <div className="profile-h">
                            <span className="profile">{profile || "??"}</span>
                          </div>
                    }
                    </div>
                  </div>
                ))
              }
          </div>

          <div ref={chatRef} />
        </div>

        <div className="input-area">
          <input
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            value={messageData.message}
            name="message"
            type="text"
            placeholder="Enter a message"
          />
          {sendingMessage ? (
            <CircularProgress size={24} style={{ marginLeft: '10px', color: '#fff' }} />
          ) : (
            <button onClick={handleSubmit} disabled={sendingMessage}>&#10148;</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
