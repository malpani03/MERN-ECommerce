import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user); // Fetching user from Redux store

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLoading = async () => {
    await fetchData();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty > 1) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (productId) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: productId }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQuantity = data.reduce((total, product) => total + product.quantity, 0);
  const totalPrice = data.reduce((total, product) => total + (product.productId?.sellingPrice ?? 0) * product.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems: data, totalPrice } });
  };

  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
        {data.length === 0 && !loading && (
          <div className='bg-white py-5'>
            <p>Your cart is empty</p>
            <button className='bg-blue-600 text-white py-2 px-4 mt-4' onClick={() => navigate('/')}>
              Shop Now
            </button>
          </div>
        )}
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        <div className='w-full max-w-3xl'>
          {loading ? (
            Array.from({ length: context.cartProductCount }).map((_, index) => (
              <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
            ))
          ) : (
            data.map((product, index) => (
              <div key={product?._id ?? index} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                <div className='w-32 h-32 bg-slate-200'>
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
                <div className='px-4 py-2 relative'>
                  <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                    <MdDelete />
                  </div>
                  <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName ?? "No Name"}</h2>
                  <p className='capitalize text-slate-500'>{product?.productId?.category ?? "No Category"}</p>
                  <div className='flex items-center justify-between'>
                    <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice ?? 0)}</p>
                    <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency((product?.productId?.sellingPrice ?? 0) * product?.quantity)}</p>
                  </div>
                  <div className='flex items-center gap-3 mt-1'>
                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                    <span>{product?.quantity}</span>
                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && data.length > 0 && (
          <div className='mt-5 lg:mt-0 w-full max-w-sm'>
            <div className='h-36 bg-white'>
              <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                <p>Quantity</p>
                <p>{totalQuantity}</p>
              </div>
              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
