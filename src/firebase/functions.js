import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  increment,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { pollsCollection, usersCollection } from "./collections";
import { fireStoredb } from ".";

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

export const firebaseUpdatePoll = async (
  optionIndex,
  pollId,
  userId,
  admin = false
) => {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(fireStoredb, "polls", pollId);

    runTransaction(fireStoredb, async (transaction) => {
      const docSnapshot = await transaction.get(docRef);
      if (!docSnapshot.exists) {
        reject("Document does not exist!");
      }

      // Get the array field you want to update
      const arrayField = docSnapshot.data().pollInfo;

      // Update the specific field within the object
      const updatedObject = {
        ...arrayField[optionIndex],
        data: [
          {
            ...arrayField[optionIndex].data[0],
            likes: arrayField[optionIndex].data[0].likes + 1,
          },
        ],
      };

      const newUsersArray = [...docSnapshot.data().users, userId];

      // Replace the object at the specified index with the updated object
      const newArray = [...arrayField];
      newArray[optionIndex] = updatedObject;

      // Update the document with the modified array
      transaction.update(docRef, { pollInfo: newArray, users: newUsersArray });
    });
  });
};

export const firebaseDeletePoll = async (pollId, userId) => {
  await new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(fireStoredb, "polls", pollId);
      const docData = await getDoc(docRef);
      if (userId !== docData.data().userId) {
        reject("Action not authorized.");
      }
      deleteDoc(docRef)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      console.log("error in deleting poll: ", error);
      reject(error);
    }
  });
};
