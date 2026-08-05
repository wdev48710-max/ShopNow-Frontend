import { useState,useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import API_URL from "../api";

const Orders = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        axios.get(`${API_URL}/api/orders/all`, {
            headers: { Authorization:"Bearer"+ token }
        }) .then((res) => setOrders(res.data))
    }

    const handleStatus = (id, status) => {
        axios.put(`${API_URL}/api/orders/${id}/status`, {
            header: { Authorization: "Bearer" + token },
        }).then(fetchOrders);
    }

  return (
    <div>
        <h1>Orders</h1>
        {orders.map((order)=> (
            <div key={order.id}>
                <p><b>{order.user?.name}</b> - {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ${order.total}</p>
            <select
            value={order.status}
            onChange={(e) => handleStatus(order.id, e.target.value)}
            >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
            </select>
            </div>
        ))}
    </div>
  )
}

export default Orders
