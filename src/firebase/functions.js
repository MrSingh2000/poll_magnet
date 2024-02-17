import { addDoc } from "firebase/firestore";
import { pollsCollection, usersCollection } from "./collections";

export const firebaseAddUserInCollection = (data) => {
  addDoc(usersCollection, data);
};

export const firebaseAddPollInCollection = (data) => {
  return new Promise((resolve, reject) => {
    addDoc(pollsCollection, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};
