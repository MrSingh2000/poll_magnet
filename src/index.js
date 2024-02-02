import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Polls from "./pages/Polls";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlQJwRfoFI63rfNPZUsH7fabxmvi8H-w8",
  authDomain: "poll-magnet.firebaseapp.com",
  projectId: "poll-magnet",
  storageBucket: "poll-magnet.appspot.com",
  messagingSenderId: "1020294529905",
  appId: "1:1020294529905:web:1cc505feb4f9bf0c676cd0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

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
        path: "polls",
        element: <Polls />,
      },
    ],
  },
  {
    path: "login",
    element: <Login firebaseApp={firebaseApp} auth={auth} />,
  },
  {
    path: "register",
    element: <Signup firebaseApp={firebaseApp} auth={auth}/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
