import React from 'react'
import DashNav from './DashNav'

import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import downloadBtn from "../assets/download_button.svg"

import "./css/Billing.css"
// import { InvalidTokenError } from 'jwt-decode';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BASE_URL

const Billing = () => {
    const navigate = useNavigate()
    const handleDownload = async(type)=> {
        try {
            const token = JSON.parse(localStorage.getItem('accessToken'));
            if (!token) {
                throw new Error('No authentication token found');
            }

            // 2. Make the request
            const response = await fetch(`${baseUrl}/download?type=${type}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // 3. Handle response errors
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            // 4. Extract filename from headers or use default
            const contentDisposition = response.headers.get('content-disposition');
            let filename = 'invoice.pdf';
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?(.+?)"?(;|$)/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }

            // 5. Create and trigger download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            
            window.open(url, '_blank');
            // 6. Cleanup
            setTimeout(() => {
                document.body.removeChild(a);
                
                window.URL.revokeObjectURL(url);
            }, 100);
            
        } catch (error) {
            console.log('download failed', error);
            if(error.message === "Token Expired, please login again"){
                toast.error("Your Token Expired, Please Login Again")
                setTimeout(() => {
                    navigate("/signin")
                }, 1000);
            }     
        }

    }
  return (
    <div>
        <DashNav billingP={"active"} />
        <div className='main'>
            <div className="warning-banner">
                <span style={{alignItems:"center", display: "flex"}}>
                    <ErrorOutlineOutlinedIcon/> 
                    <div style={{marginLeft: "10px"}}>Your service has been disabled due to a hardware issue. Please ensure all hardware are functioning.</div>
                </span>
            </div>
            <h2 className='billing' >Billing</h2>
            <p className="billing-sub">Manage your invoices and payments.</p>
            <div className="billing-container">
                <div className='billing-box'>
                    <div style={{display: "flex"}}>
                        <div style={{flexGrow: "2"}}>
                            <h2 style={{fontSize: "15px", fontWeight: "400", marginBottom: "20px"}}>Balance Due</h2>
                            <div className="balance-amount">
                                <div style={{display: 'inline', marginRight:"8px"}}>
                                    £0.00 
                                </div>
                                <span className="Unpaid">
                                    <ErrorOutlineOutlinedIcon />
                                </span>
                            </div>
                        </div>
                        <div >
                            <button className="pay-button">Pay</button>
                        </div>
                    </div>
                </div>
                <div className='billing-box'>
                    <div style={{display: "flex"}}>
                        <div style={{flexGrow: "2"}}>                            
                            <h2 style={{fontSize: "15px", fontWeight: "400", marginBottom: "20px"}}>Billing Cycle</h2>
                            <div className="balance-amount">
                                <p style={{display: 'inline', marginRight:"8px", fontSize: "15px"}}>
                                    Yearly subscriptions have been added to this account.
                                </p>
                                {/* <span className="Unpaid">
                                    <ErrorOutlineOutlinedIcon />    
                                </span> */}
                            </div>
                        </div>
                        <div >
                            <ErrorOutlineOutlinedIcon /> 
                        </div>
                    </div>
                </div>
                <div className='billing-box'>
                    <div style={{display: "flex"}}>
                        <div style={{flexGrow: "2"}}>
                            <h2 style={{fontSize: "15px", fontWeight: "400", marginBottom: "20px"}}>Payment Method</h2>
                            <div className="balance-amount">
                                <div style={{display: 'inline', marginRight:"8px", fontSize: "15px"}}>
                                    <p>Muhammad Amir Masoom</p>
                                    <p>MC ending in 1371</p>
                                    <p>Expires: 9/25</p>
                                </div>
                            </div>
                        </div>
                        <div >
                            <button className="pay-button">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="invoice">
                Invoice
            </h2>
            <div className="invoice-conatainer">
                <table className='billing-table'>
                    <thead >
                        <tr className='billing-thead'>
                            <th >Date</th>
                            <th>Due Date</th>
                            <th>Description</th>
                            <th>Invoice Number</th>
                            <th>Method</th>
                            <th>Total</th>
                            <th>Balance..</th>
                            <th colSpan={2}>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody className='billing-tbody'>
                        <tr>
                            <td>12/16/2024</td>
                            <td>12/18/2024</td>
                            <td>Subscription</td>
                            <td>INV-GBR-2198603-40199-19</td>
                            <td>Bank Transfer..</td>
                            <td>£300.00</td>
                            <td>£300.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>12/16/2024</td>
                            <td>12/18/2024</td>
                            <td>Subscription</td>
                            <td>INV-GBT-2198603-40199-19</td>
                            <td>Bank Transfer..</td>
                            <td>£900.00</td>
                            <td>£900.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing2')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
                <div colSpan={6}  style={{width: "100%", display: "", justifyContent: "right", }} className="pagination">
                    <span>Rows per page:</span>
                    <select className='p-button'>
                    <option>10</option>
                    <option>25</option>
                    </select>
                    <span>1 - 4 of 4</span>
                    <button className='p-button'>{"\u25C0"}</button>
                    <button className='p-button'>{"\u25B6"}</button>
                </div>
            </div>
            {/* <div className="billing-payment">
                <h2 className='invoice'>Payments</h2>
                <div style={{backgroundColor: "rgb(18,18,18)"}} className='billing-payment-container'>
                    <div>Date</div>
                    <div>Payment</div>
                    <div>Status</div>
                </div>
                <div className='billing-payment-container'>
                    <div>6/3/2025</div>
                    <div>£75.00</div>
                    <div className='payment-failed'>Failed</div>
                </div>
                <div className='billing-payment-container'>
                    <div>6/3/2025</div>
                    <div>£75.00</div>
                    <div className='payment-complete'>Complete</div>
                </div>
                <div colSpan={6}  style={{width: "100%", display: "", justifyContent: "right", }} className="pagination">
                    <span>Rows per page:</span>
                    <select className='p-button'>
                    <option>10</option>
                    <option>25</option>
                    </select>
                    <span>1 - 4 of 4</span>
                    <button className='p-button'>{"\u25C0"}</button>
                    <button className='p-button'>{"\u25B6"}</button>
                </div>

            </div> */}
        </div>
    </div>
  )
}

export default Billing