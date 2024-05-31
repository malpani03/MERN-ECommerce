import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import displayINRCurrency from '../helpers/displayCurrency';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, totalPrice } = location.state || {};

  if (!orderId || !totalPrice) {
    navigate('/');
    return null;
  }

  const getDeliveryDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    return currentDate.toDateString();
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white p-6 shadow-md rounded-md mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
        <p className="text-lg mb-2">Thank you for your purchase!</p>
        <p className="text-lg mb-2">Order ID: <span className="font-medium">{orderId}</span></p>
        <p className="text-lg mb-2">Total Amount: <span className="font-medium">{displayINRCurrency(totalPrice)}</span></p>
        <p className="text-lg mb-4">Estimated Delivery Date: <span className="font-medium">{getDeliveryDate()}</span></p>
        <button
          className="bg-blue-600 text-white py-2 px-4 mt-4"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
