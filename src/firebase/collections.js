import { collection } from "firebase/firestore";
import { fireStoredb } from ".";

export const usersCollection = collection(fireStoredb, 'users');
export const pollsCollection = collection(fireStoredb, 'polls');