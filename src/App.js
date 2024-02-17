import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { fetchFromLocalStorage } from "./helpers";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/features/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = fetchFromLocalStorage();
    if (userDetails) dispatch(updateUser(userDetails));
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Outlet />
    </>
  );
}

export default App;
