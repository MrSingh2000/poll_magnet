import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { fetchFromLocalStorage } from "./helpers";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/features/userSlice";
import Home from "./pages/Home";
import Polls from "./pages/Polls";
import Dashboard from "./pages/Dashboard";
import CreatePolls from "./pages/CreatePolls";
import SharePoll from "./pages/SharePoll";
import VerifyEmail from "./pages/VerifyEmail";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ErrorPage from "./pages/ErrorPage";
import Resetpass from "./pages/Resetpass";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = fetchFromLocalStorage();
    if (userDetails) dispatch(updateUser(userDetails));
  }, []);

  return (
    <>
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
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="" element={<Home />} />
          <Route path="polls" element={<Polls />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="createPoll" element={<CreatePolls />} />
          <Route path="poll/:id" element={<SharePoll />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/resetpass" element={<Resetpass />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
