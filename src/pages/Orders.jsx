import { useState,useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import API_URL from "../api";

const Orders = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        axios.get(`${API_URL}/api/orders/all`, {
            headers: { Authorization: "Bearer " + token }
        }) .then((res) => setOrders(res.data))
    }

    const handleStatus = (id, status) => {
        axios.put(`${API_URL}/api/orders/${id}/status`, { status }, {
            headers: { Authorization: "Bearer " + token },
        }).then(fetchOrders);
    }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-darkColor mb-6">Orders</h1>
        {orders.map((order)=> (
            <div key={order._id} className="bg-white rounded-lg shadow p-4 mb-4">
                <p><b>{order.user?.name}</b> - {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="font-bold text-darkBlue">Total: ${order.total}</p>
            <select
            value={order.status}
            onChange={(e) => handleStatus(order._id, e.target.value)}
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
