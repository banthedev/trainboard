import { database } from '../firebase';
import { arrayRemove, doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';

export function addUserToCollection(uid, username, email) {
  return setDoc(doc(database, "users", uid), {
    username: username,
    email: email,
  });
};

export function addWorkoutToDocument(user, data, isPrivate) {
    let subcollectionName = isPrivate ? "Private Workouts" : "Public Workouts";
    const messageRef = doc(database, "users", user.uid, subcollectionName, data.workoutName);
    return setDoc(messageRef, {
      workoutName: data.workoutName,
      isPrivate: data.isPrivate,
      workoutExercises: [...data.exercises]
    });
}
  
  

// export function removeWorkoutFromDocument(user, workoutId, isPrivate) {
//   const subcollectionName = isPrivate ? "Private Workouts" : "Public Workouts";
//   const subcollectionRef = doc(database, "users", user.uid, subcollectionName);
//   return updateDoc(subcollectionRef, {
//     workouts: arrayRemove(workoutId)
//   });
// }

// export async function getUsername(user) {
//   const docRef = doc(database, "users", user.uid)
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     return docSnap.data().username;
//   }
// }