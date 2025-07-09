import React,{useState, useEffect} from 'react'
import "./css/Message.css"
import { Link } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';

import DashNav from './DashNav'

import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';

const Message = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    // const [selectedConversation, setSelectedConversation] = useState(null);

    useEffect(() => {
        // Show modal if the current URL ends with "new-ticket"
        if (window.location.pathname.endsWith("new-ticket")) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [window.location.pathname]);

    const openModal = () => navigate("new-ticket");
    const tickets = [
        {
            title: "Internet",
            id: "TIK-51243812-57237-39",
            status: "Unresolved",
            updated: "6/18/2025",
            unread: true,
        },
        
    ];
    return showModal ? <Outlet /> :
        
    (<div>
        <DashNav messageP={"active"} />
        <div className='main'>
            <div className="messages-container">
                <div className="messages-header">
                    <h2>Messages</h2>
                    <button onClick={openModal} className="new-ticket">New Ticket</button>
                </div>

                <div style={{display:"flex", alignItems: "center"}}>
                    <div className="search-bar">
                        <input type="text" placeholder="Search tickets" />
                        <div className="icons">
                            <span>
                                <SearchIcon />
                            </span>
                        </div>
                    </div>
                    <span className="filter-icon">
                        <TuneIcon />
                    </span>
                </div>

                <table className="messages-table">
                    <thead>
                    <tr>
                        <th>Ticket</th>
                        <th>Last Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index} className={ticket.unread ? "unread" : "archived"}>
                        <td>
                            {ticket.unread && <span className="dot" />}
                            <div className="ticket-title">{ticket.title}</div>
                            <div className="ticket-meta">
                            {ticket.status} • {ticket.id}
                            </div>
                        </td>
                        <td>
                            <span className="updated-date">{ticket.updated}</span>
                            <span className="arrow">{">"}</span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <span>Rows per page:</span>
                    <select className='bg-dark'>
                    <option>5</option>
                    <option>10</option>
                    </select>
                    <span>1 - 2 of 2</span>
                    <button className='btn'>{"<"}</button>
                    <button className='btn'>{">"}</button>
                </div>
            </div>
        </div>
    </div>)

}

export default Message