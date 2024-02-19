import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";

// signin
export const firebaseSignIn = (auth, email, password) => {
  return new Promise(async (resolve, reject) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User credential: ", userCredential);
        console.log("user: ", user);
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          "Error code: ",
          errorCode,
          " Error message: ",
          errorMessage
        );
        reject({ errorCode, errorMessage });
      });
  });
};

// signup new user
export const firebaseSignUp = (auth, email, password) => {
  return new Promise(async (resolve, reject) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("user credentails: ", userCredential);
        console.log("user: ", user);
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          "Error code: ",
          errorCode,
          " Error Message: ",
          errorMessage
        );
        reject({ errorCode, errorMessage });
      });
  });
};

export const firebaseAuthChanged = (auth) => {
  return new Promise(async (resolve, reject) => {});
};

export const showToast = (message, type = "success") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;

    case "error":
      toast.error(message);
      break;

    default:
      toast.info(message);
      break;
  }
};

export const updateLocalStorage = (data) => {
  localStorage.setItem("pollMagnetUser", JSON.stringify(data));
};

export const fetchFromLocalStorage = () => {
  const userDetails = localStorage.getItem("pollMagnetUser");
  return JSON.parse(userDetails);
};

export const clearLocalStorage = () => {
  localStorage.removeItem("pollMagnetUser");
};

export const isAlreadyVoted = (poll, userId) => {
  console.log("poll: ", poll.data.users);
  const listOfVoters = poll.data.users;
  if (!listOfVoters) return false;
  return listOfVoters.includes(userId);
};
