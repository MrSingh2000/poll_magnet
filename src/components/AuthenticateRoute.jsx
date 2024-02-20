import React from "react";
import { useSelector } from "react-redux";
import { fetchFromLocalStorage } from "../helpers";
import { useNavigate } from "react-router-dom";

function AuthenticateRoute({ children }) {
  const userDetails = useSelector((store) => store.user);

  const localStorageUser = fetchFromLocalStorage();
  const navigate = useNavigate();

  console.log('here 1');
  console.log(userDetails, '\n', localStorageUser)

  if (!userDetails?.email) {
    console.log(userDetails, '\n', localStorageUser)
    console.log("here 2");
    navigate("/login");
    return;
  } else {
    console.log("here 3");
    return <>{children}</>;
  }
}

export default AuthenticateRoute;
