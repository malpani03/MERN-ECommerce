import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import SummaryApi from "./common";
import Context from "./context";

const App = () => {
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();
      console.log("data-user", dataApi);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
    <Context.Provider value={{
      fetchUserDetails
    }}>
      <ToastContainer />
      <Header />
      <main className="min-h-[calc(100vh-130px)]">
        <Outlet />
      </main>
      <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
