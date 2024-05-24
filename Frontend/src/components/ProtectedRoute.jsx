import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector from react-redux

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user); // Access the user state from the Redux store
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to the home page if the user is logged in
    }
  }, [user, navigate]);

  return user ? null : children;
};

export default ProtectedRoute;