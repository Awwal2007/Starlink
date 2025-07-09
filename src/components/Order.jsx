import React from 'react'
import DashNav from './DashNav'
import "./css/Order.css"
// import image from '../assets/StarlinkCable_500x500.webp'

const Order = () => {
    const orders = [
        // {
        //     placed: "10/27/2023",
        //     item: "150ft Replacement Cable",
        //     image: image,
        //     orderNumber: "ORD-28498784-67131-11",
        //     trackingNumber: "9765450951",
        //     delivery: "10/30/2023 - 11/5/2023",
        //     status: "Shipped",
        // },
        // {
        //     placed: "10/25/2023",
        //     item: "150ft Replacement Cable",
        //     image: image,
        //     orderNumber: "ORD-28390317-19044-9",
        //     trackingNumber: "8271134001",
        //     delivery: "10/27/2023 - 11/2/2023",
        //     status: "Shipped",
        // },
        // {
        //     placed: "10/12/2023",
        //     item: "150ft Replacement Cable + 1",
        //     image: image,
        //     orderNumber: "ORD-27486164-37625-4",
        //     trackingNumber: "ORD-27486164-37625-4",
        //     delivery: "10/24/2023 - 10/30/2023",
        //     status: "Processing",
        // },
        {
            placed: "-",
            item: "-",
            image: "-",
            orderNumber: "-",
            trackingNumber: "-",
            delivery: "-",
            status: "",
        },
        // {
        //     placed: "10/12/2023",
        //     item: "Starlink Standard Actuated Kit",
        //     image: image,
        //     orderNumber: "ORD-27480063-42333-8",
        //     trackingNumber: "ORD-27480063-42333-8",
        //     delivery: "-",
        //     status: "Shipped",
        // },
    ];
  return (
    <div>
        <DashNav orderP={"active"} />
        <div className='main'>
            <div className="orders-container">
                <div style={{marginBottom: "15px", marginTop:"80px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h2>Orders</h2>
                    <input
                        type="text"
                        placeholder="Search by order number"
                        className="order-search"
                    />
                </div>            
            <table className="orders-table">
                <thead>
                <tr>
                    <th>Placed</th>
                    <th>Items</th>
                    <th>Order Number</th>
                    <th>Tracking Number</th>
                    <th>Estimated Delivery</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((o, i) => (
                    <tr key={i}>
                    <td>{o.placed}</td>
                    <td className="item-cell">
                        {/* <img className='o-img' src={o.image} alt="item" /> */}
                        <div>{o.item}</div>
                    </td>
                    <td>{o.orderNumber}</td>
                    <td>
                        <a
                        href={`https://tracking.example.com/${o.trackingNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        >
                        {o.trackingNumber}
                        </a>
                    </td>
                    <td>{o.delivery}</td>
                    <td>
                        <span
                        className={`status-badg ${
                            o.status === "Shipped"
                            ? "shipped"
                            : o.status === "Processing"
                            ? "processing"
                            : ""
                        }`}
                        >
                        {/* {o.status} */}
                        {"-"}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
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
        </div>
    </div>
  )
}

export default Order