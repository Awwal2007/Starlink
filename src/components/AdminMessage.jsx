
import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useParams, } from 'react-router-dom';
import { toast } from 'sonner';

import CircularProgress from '@mui/material/CircularProgress';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';


const AdminMessage = () => {
    const {userId} = useParams();
    const [profile, setProfile] = useState('');
    const [messageData, setMessageData] = useState({ message: '', userId });
    const [sendingMessage, setSendingMessage] = useState(false);
    const [messages, setMessages] = useState([]);
    const [adminMessages, setAdminMessages] = useState([]);
    const chatRef = useRef(null);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    // Decode user profile initials
    // const navigate = useNavigate();
    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('accessToken'));
      if (token) {
          try {
          const decoded = jwtDecode(token);
          const fullname = decoded.name || '';
          const [first, last] = fullname.split(' ');
          const userProfile = `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase();
          setProfile(userProfile);
          } catch (error) {
          console.error('Invalid token:', error);
          }
      }
      const message = async ()=> {
        await fetchLatestUserReply();
        await fetchAdminMessages();
      }
      message();
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
      // const intervalId = setInterval(fetchAdminMessages, 1000)
      // return () => clearInterval(intervalId);
         
    }, []);

      // Fetch chat history
      const fetchAdminMessages = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('accessToken'));
            const res = await fetch(`${baseUrl}/message/admin-messages/${userId}`, {
                method: 'GET',
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

    // useEffect(() => {
    //     chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages, adminMessages]);

    const sendMessage = async () => {
        const newUserMessage = messageData.message;
    
        // Optimistic update
        // setMessages(prev => [...prev, { sender: 'user', text: newUserMessage }]);
    
        try {
          setSendingMessage(true);
          const token = JSON.parse(localStorage.getItem('accessToken'));
          // console.log(token);

          const payload = {
            ...messageData,
            userId  // ← force-include userId from route
          };
    
          const res = await fetch(`${baseUrl}/message/admin-reply`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
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
              fetchLatestUserReply();
              fetchAdminMessages();
            }, 1500);
          // window.location.reload();
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

    const fetchLatestUserReply = async () => {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        if (!userId) return; // Prevent fetch if undefined

        try {
          const res = await fetch(`${baseUrl}/message/admin-user-message/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
          // console.log(userId);
          
          // console.log(data);
          
          const adminMsgs = data.data;
          console.log(adminMsgs);
          
          setAdminMessages(adminMsgs);
        } catch (err) {
          console.error('Error updating admin replies:', err);
        }
    };
      // fetchLatestUserReply();

   

    const handleInput = (e) => {
        const { name, value } = e.target;
        setMessageData(prev => ({ ...prev, [name]: value, userId }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!messageData.message?.trim()) {
        toast.warning('Please enter a message.');
        return;
        }
        sendMessage();
        setMessageData({ message: '' });
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
        <Link to="/admin" className="top-message">
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
            <div className="message-container">
              {adminMessages.length === 0 && <div className="admin-message">No replies from admin yet.</div>}
              {messages.length === 0 && <div className="user-message">No message yet send new message now.</div>}
              {[...adminMessages, ...messages]
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((msg) => (
                  <div style={{display: "flex", width: "100%"}}>
                    <div>
                      {adminMessages.some(m => m._id === msg._id) && <div className="profile-h">
                            <span className="profile">{"A"}</span>
                          </div>
                    }
                    </div>
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
          </div>

          {/* <div className="a-message">
            {messages
            .slice() // clone array to avoid mutating state
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((msg)  => (
              <div key={msg._id} className="user-message">{msg.message}</div>
            ))}
          </div> */}

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

export default AdminMessage;
