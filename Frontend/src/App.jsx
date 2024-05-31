import { Outlet } from "react-router-dom";
import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount]=useState(0)
  const user = useSelector((state) => state.user.user);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart=async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count)
  };

  useEffect(() => {
    if (!user) {
      fetchUserDetails();
    }
  }, [user]);

  useEffect(()=>{
    fetchUserAddToCart();
  },[])

  return (
    <>
      <Context.Provider value={{ fetchUserDetails,fetchUserAddToCart,cartProductCount }}>
        <ToastContainer position="top-center"/>
        <Header />
        <main className="min-h-[calc(100vh-130px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;