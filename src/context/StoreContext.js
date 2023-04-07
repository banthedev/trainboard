import { database } from '../firebase';
import { arrayUnion, arrayRemove, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
export function addUserToCollection(uid, username, email) {
  return setDoc(doc(database, "users", uid), {
    username: username,
    email: email,
  });
};

// Function for adding data to document 
export function addAppToDocument(data, user) {
  // Get reference to document
  const docRef = doc(database, "users", user.uid);
  return updateDoc(docRef, {
    apps: arrayUnion(data)
  });
}

// Generic function for removing data from document
export function removeAppFromDocument(data, user) {
  // Get reference to document
  const docRef = doc(database, "users", user.uid);
  return updateDoc(docRef, {
    // Delete item in array
    apps: arrayRemove(data)
  });
}

export async function getUsername(user) {
  const docRef = doc(database, "users", user.uid)
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().username;
  }
}
