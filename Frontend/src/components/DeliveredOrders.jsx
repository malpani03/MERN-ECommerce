import { useEffect, useState } from 'react';

const DeliveredOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('delivered');

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/deliveredorders');
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error('Failed to fetch orders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching delivered orders:', error);
      }
    };

    fetchDeliveredOrders();
  }, [status]); // Add status as a dependency

  const handleOrderClick = (orderId) => {
    const order = orders.find(order => order._id === orderId);
    setSelectedOrder(order);
    setStatus(order.status);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/updateStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
          setStatus(newStatus);
        }
      } else {
        console.error('Failed to update status:', data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Delivered Orders</h1>
      {selectedOrder ? (
        <div>
          <button onClick={() => setSelectedOrder(null)} className="mb-4 px-4 py-2 bg-gray-200 rounded">Back to Orders List</button>
          <div className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="mb-4">
              <strong className="text-lg">Order ID:</strong> {selectedOrder._id}
            </div>
            <div className="mb-4">
              <strong className="text-lg">Status:</strong>
              <select value={status} onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)} className="ml-2 px-2 py-1 border border-gray-300 rounded">
                <option value="pending">Pending</option>
                <option value="processed">Processed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="mb-4">
              <strong className="text-lg">Total Price:</strong> ${selectedOrder.totalPrice.toFixed(2)}
            </div>
            <div className="mb-4">
              <strong className="text-lg">Items:</strong>
              <ul className="list-disc list-inside">
                {selectedOrder.items.map(item => (
                  <li key={item._id} className="mt-2">
                    <div>
                      <strong className="text-lg">Product Name:</strong> {item.productId.productName}
                    </div>
                    <div>
                      <strong className="text-lg">Brand:</strong> {item.productId.brandName}
                    </div>
                    <div>
                      <strong className="text-lg">Category:</strong> {item.productId.category}
                    </div>
                    <div>
                      <strong className="text-lg">Price:</strong> ${item.productId.sellingPrice.toFixed(2)}
                    </div>
                    <div>
                      <strong className="text-lg">Quantity:</strong> {item.quantity}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <button onClick={() => handleOrderClick(order._id)} className="text-blue-500 underline">
                  {order._id}
                </button>
              </div>
              <div>
                <strong>Status:</strong> {order.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeliveredOrders;
