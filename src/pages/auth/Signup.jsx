import React, { useState } from "react";
import { firebaseSignUp, showToast, updateLocalStorage } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { updateLoading } from "../../redux/features/loaderSlice";
import Loader from "../../components/Loader";
import { ToastContainer } from "react-toastify";
import { updateUser } from "../../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAddUserInCollection } from "../../firebase/functions";
import { firebaseAuth } from "../../firebase";

function Signup(props) {
  const navigate = useNavigate();
  const loading = useSelector((store) => store.loading.value);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(updateLoading(true));
  
    try {
      const res = await firebaseSignUp(firebaseAuth, data.email, data.password);
      const userDetails = {
        authToken: res.accessToken,
        userId: res.uid,
        refreshToken: res.refreshToken,
        email: res.email,
      };
  
      dispatch(updateUser(userDetails));
      updateLocalStorage(userDetails);
  
      await firebaseAddUserInCollection({
        email: res.email,
        uid: res.uid,
      });
  
      showToast("Registered successfully.");
      navigate("/");
    } catch (err) {
      console.log("error: ", err);
      showToast(err.errorMessage, "error");
    } finally {
      dispatch(updateLoading(false));
    }
  };
  

  return loading ? (
    <Loader />
  ) : (
    <>
      <section>
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
        <div className="flex w-full justify-center items-center overflow-hidden">
          <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 my-4 shadow-xl rounded-lg">
            <div className="w-full max-w-xl mx-auto lg:w-96">
              <div>
                <a className="text-blue-600 text-medium" href="/groups/login/">
                  Poll Magnet
                </a>
                <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">
                  Sign up.
                </h2>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form action="#" method="POST" className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-600"
                      >
                        {" "}
                        Email address{" "}
                      </label>
                      <div className="mt-1">
                        <input
                          onChange={(e) => handleChange(e)}
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required=""
                          placeholder="Your Email"
                          className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-neutral-600"
                      >
                        {" "}
                        Password{" "}
                      </label>
                      <div className="mt-1">
                        <input
                          onChange={(e) => handleChange(e)}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required=""
                          placeholder="Your Password"
                          className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={(e) => handleSignup(e)}
                        type="submit"
                        className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-neutral-600">
                        {" "}
                        Or already registered?
                      </span>
                    </div>
                  </div>
                  <div>
                    <Link to={"/login"}>
                      <button
                        type="submit"
                        className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <div className="flex items-center justify-center">
                          <span className="ml-4"> Go to Log in</span>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
