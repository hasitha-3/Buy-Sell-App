import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Home/Navbar';
import { useAppContext } from '../../MyContext';

function Orders() {
  const { info } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [info.userId]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/orders/user/${info.userId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeliveryStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="text-center mt-10">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="px-4 py-8 flex justify-center">
          <div className="glass-card rounded-2xl p-8 w-full max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Orders</p>
            <h1 className="hero-title text-4xl font-bold mt-2">No orders yet</h1>
            <p className="text-slate-600 mt-3">
              Place an order and track its status here in real time.
            </p>
            <Link to="/home" className="btn-primary inline-flex mt-6 px-5 py-2 rounded-xl font-semibold">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-4 py-8 max-w-5xl mx-auto">
        <h1 className="hero-title text-4xl font-bold mb-8">Your Orders</h1>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="glass-card rounded-xl overflow-hidden">
              {/* Order Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-white/70 transition"
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-semibold">Order ID:</span> {order.orderNumber}
                    </p>
                    <p className="text-lg font-bold">{order.items.length} Item{order.items.length > 1 ? 's' : ''}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Ordered: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="hero-title text-2xl font-bold text-green-600">₹{order.totalPrice}</p>
                    <div className="flex gap-2 mt-3 justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                        💳 {order.paymentStatus}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDeliveryStatusColor(order.deliveryStatus)}`}>
                        📦 {order.deliveryStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Details (Expandable) */}
              {expandedOrder === order._id && (
                <div className="border-t p-6 bg-white/50">
                  <h3 className="font-bold mb-4">Order Items:</h3>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold">{item.itemname}</p>
                          <p className="text-sm text-slate-600">{item.itemcategory}</p>
                          <p className="text-sm">Qty: <span className="font-semibold">{item.quantity}</span></p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">₹{item.itemprice}</p>
                          <p className="text-sm text-slate-600">₹{item.itemprice * item.quantity} total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Timeline */}
                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <h3 className="font-bold mb-4\">Delivery Timeline:</h3>
                    <div className="space-y-2 text-sm\">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">✅</span>
                        <span>Order Placed - {new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{order.deliveryStatus === 'Processing' ? '⏳' : '✅'}</span>
                        <span>Processing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{['Shipped', 'Delivered'].includes(order.deliveryStatus) ? '✅' : '⏳'}</span>
                        <span>Shipped</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{order.deliveryStatus === 'Delivered' ? '✅' : '⏳'}</span>
                        <span>Delivered {order.deliveredAt ? `- ${new Date(order.deliveredAt).toLocaleDateString()}` : ''}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-500 mt-4\">
                    Payment Status: <span className="font-semibold">{order.paymentStatus}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders