import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import displayINRCurrency from "../helpers/displayCurrency";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51P3EuySD7FZcjQwhnePhPI41P7apEHsNVnm8fSmNWtvG3AKZXDZK2rhXY8k22hDrF0iTLC3wMOmZE1HDB5tHaipd00rObKZf4e');

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const user = useSelector((state) => state.user.user);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [contact, setContact] = useState("");

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        user={user}
        cartItems={cartItems}
        totalPrice={totalPrice}
        street={street}
        setStreet={setStreet}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        contact={contact}
        setContact={setContact}
        navigate={navigate}
      />
    </Elements>
  );
};

const CheckoutForm = ({
  user,
  cartItems,
  totalPrice,
  street,
  setStreet,
  city,
  setCity,
  state,
  setState,
  postalCode,
  setPostalCode,
  contact,
  setContact,
  navigate
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const handlePayment = async () => {
    setLoading(true);
  
    try {
      if (paymentMethod === "stripe") {
        const response = await fetch('http://localhost:5000/api/payment/create-payment-intent', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            products: cartItems.map(item => ({ productId: item.productId._id, quantity: item.quantity })),
            totalPrice,
            user,
            address: { street, city, state, postalCode }
          }),
        });
  
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message);
        }
  
        const { clientSecret } = result;
        const paymentMethodReq = {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${user.firstName} ${user.lastName}`,
            address: {
              line1: street,
              city,
              state,
              postal_code: postalCode
            }
          }
        };
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodReq
        });
  
        if (error) {
          throw new Error(error.message);
        }
  
        if (paymentIntent.status === "succeeded") {
          await confirmOrder(paymentIntent.id, 'paid');
        }
      } else {
        await confirmOrder(null, 'cod');
      }
    } catch (error) {
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  const confirmOrder = async (paymentIntentId, paymentMethod) => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId,
          user,
          products: cartItems.map(item => ({ productId: item.productId._id, quantity: item.quantity })),
          totalPrice,
          paymentMethod,
          address: { street, city, state, postalCode },
          contact
        }),
      });
  
      const result = await response.json();
      if (result.success) {
        await deleteCartProducts();
        toast.success(`Order placed successfully! Order ID: ${result.order._id}`);
        navigate('/order-summary', { state: { orderId: result.order._id, totalPrice } });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(`Order placement failed: ${error.message}`);
    }
  };
  

  const deleteCartProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/delete-all-cart-products', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error(`Failed to delete cart products: ${error.message}`);
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <h2 className='text-center text-3xl my-3 font-semibold'>Checkout</h2>
      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        <div className='w-full lg:w-2/3'>
          <h3 className='text-lg my-2'>Shipping Address</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <input
              className='w-full border p-2 rounded'
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder='Street Address'
            />
            <input
              className='w-full border p-2 rounded'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='City'
            />
            <input
              className='w-full border p-2 rounded'
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder='State'
            />
            <input
              className='w-full border p-2 rounded'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder='Postal Code'
            />
            <input
              className='w-full border p-2 rounded'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder='Contact Number'
            />
          </div>

          <h3 className='text-lg my-2'>Review Items</h3>
          {cartItems.length > 0 ? (
            cartItems.map((product, index) => (
              <div key={index} className='w-full bg-white my-2 border border-slate-300 rounded flex flex-col sm:flex-row'>
                <div className='w-full sm:w-32 h-32 bg-slate-200'>
                  {product?.productId?.productImage?.[0] ? (
                    <img
                      src={product.productId.productImage[0]}
                      alt={product.productId.productName}
                      className='w-full h-full object-scale-down mix-blend-multiply'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-500'>
                      No Image
                    </div>
                  )}
                </div>
                <div className='flex-grow px-4 py-2'>
                  <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName ?? "No Name"}</h2>
                  <p className='capitalize text-slate-500'>{product?.productId?.category ?? "No Category"}</p>
                  <div className='flex items-center justify-between'>
                    <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice ?? 0)}</p>
                    <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency((product?.productId?.sellingPrice ?? 0) * product?.quantity)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </div>

        <div className='mt-5 lg:mt-0 w-full lg:w-1/3'>
          <div className='bg-white p-4'>
            <h2 className='text-white bg-red-600 px-4 py-2'>Summary</h2>
            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
              <p>Total Price</p>
              <p>{displayINRCurrency(totalPrice)}</p>
            </div>
            <div className='mt-4'>
              <label className='block mb-2'>Select Payment Method</label>
              <select
                className='w-full border p-2 rounded'
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="stripe">Card Payment</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
            {paymentMethod === "stripe" && (
              <div className="mt-4">
                <CardElement />
              </div>
            )}
            <button
              className='bg-blue-600 p-2 text-white w-full mt-2'
              onClick={handlePayment}
              disabled={loading || (paymentMethod === "stripe" && (!stripe || !elements))}
            >
              {loading ? 'Processing...' : `Place Order with ${paymentMethod === "stripe" ? 'Card' : 'COD'}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
