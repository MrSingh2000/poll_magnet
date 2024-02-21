import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthenticateRoute({ children }) {
  const userDetails = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails?.email) {
      navigate("/login");
    }
  }, [userDetails, navigate]);

  // Render children only if user is authenticated
  return userDetails?.email ? <>{children}</> : null;
}

export default AuthenticateRoute;
