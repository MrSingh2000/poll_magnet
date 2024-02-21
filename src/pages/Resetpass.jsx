import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { firebaseAuth } from "../firebase";
import { showToast } from "../helpers";

function Resetpass() {
  const [email, setEmail] = useState("");

  const handleResetMail = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await sendPasswordResetEmail(firebaseAuth, email);

      showToast("Password reset mail sent!");
    } catch (error) {
      console.log("error in sending reset mail: ", error);
      showToast("Invalid Mail", "error");
    }
  };

  return (
    <div className="container w-full m-auto h-screen flex justify-center items-center">
      <div className="container flex flex-col justify-center items-center border-1 border-gray-500 w-fit py-5 px-7 rounded-xl shadow-md">
        <p className="text-2xl font-semibold mb-1">No worries! &#x1F607;</p>
        <p className="text-sm">Enter your registered email.</p>
        <div className="my-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required=""
            placeholder="Your Email"
            value={email}
            className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-blue-300 rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-300"
          />
        </div>
        <button
          onClick={(e) => handleResetMail(e)}
          className={`mt-4 flex items-center justify-center w-fit px-7 py-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform rounded-lg ${
            !email
              ? "bg-blue-300"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }`}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Resetpass;
