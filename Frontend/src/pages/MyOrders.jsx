import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // State to track expanded order
  const user = useSelector(state => state.user?.user);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/userOrders', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${document.cookie.split('=')[1]}` // Assuming token is stored in cookies
          }
        });

        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Error fetching orders');
      }
    };

    if (user?._id) {
      fetchUserOrders();
    }
  }, [user]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">My Orders</h1>
      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order._id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleOrderDetails(order._id)}>
                <div>
                  <strong className="text-lg">Order ID:</strong> {order._id}
                </div>
                <div className="text-blue-500">
                  {expandedOrderId === order._id ? 'Hide Details' : 'Show Details'}
                </div>
              </div>
              {expandedOrderId === order._id && (
                <div className="mt-4">
                  <div className="mb-4">
                    <strong className="text-lg">Status:</strong> {order.status}
                  </div>
                  <div className="mb-4">
                    <strong className="text-lg">Total Price:</strong> ₹{order.totalPrice.toFixed(2)}
                  </div>
                  <div className="mb-4">
                    <strong className="text-lg">Items:</strong>
                    <ul className="list-none mt-2 space-y-2">
                      {order.items.map(item => (
                        <li key={item._id} className="p-2 border border-gray-200 rounded-lg">
                          <div className="flex">
                            {item.productId.productImage?.[0] ? (
                              <img
                                src={item.productId.productImage[0]}
                                alt={item.productId.productName}
                                className="w-16 h-16 object-cover mr-4"
                              />
                            ) : (
                              <div className="w-16 h-16 flex items-center justify-center bg-gray-200 mr-4">
                                No Image
                              </div>
                            )}
                            <div>
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
                                <strong className="text-lg">Price:</strong> ₹{item.productId.sellingPrice.toFixed(2)}
                              </div>
                              <div>
                                <strong className="text-lg">Quantity:</strong> {item.quantity}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
