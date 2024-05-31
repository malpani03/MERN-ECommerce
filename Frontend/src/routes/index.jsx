import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProtectedRoute from "../components/ProtectedRoute"
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import OrderSummary from "../pages/OrderSummary";
import PendingOrders from "../components/PendingOrders";
import DeliveredOrders from "../components/DeliveredOrders";
import MyOrders from "../pages/MyOrders";
import Checkout from "../pages/Checkout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path:"product-category",
        element:<CategoryProduct/>
      },
      {
        path:'product/:id',
        element:<ProductDetails/>
      },
      {
        path:'cart',
        element:<Cart/>,
      },
      {
        path:'search',
        element:<SearchProduct/>
      },
      {
        path:'order-summary',
        element:<OrderSummary/>
      },
      {
        path:'my-orders',
        element:<MyOrders/>
      },
      {
        path:'checkout',
        element:<Checkout/>
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path:"orders/pending",
            element:<PendingOrders/>
          },
          {
            path:"orders/delivered",
            element:<DeliveredOrders/>
          },
        ],
      },
    ],
  },
]);

export default router;