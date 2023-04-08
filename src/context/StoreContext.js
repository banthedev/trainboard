import { database } from '../firebase';
import { arrayRemove, doc, getDoc, setDoc, updateDoc, collection, Timestamp } from 'firebase/firestore';

export function addUserToCollection(uid, username, email) {
  return setDoc(doc(database, "users", uid), {
    username: username,
    email: email,
  });
};



export async function addWorkoutToDocument(user, data, isPrivate) {
    let subcollectionName = isPrivate ? "Private Workouts" : "Public Workouts";
    const messageRef = doc(database, "users", user.uid, subcollectionName, data.workoutName);

    const name = await getUsername(user);
    const randomId = makeid(20);
    const currentTime = Timestamp.now();
    addWorkoutToMain(name, data.workoutName, randomId, isPrivate, currentTime, data.exercises);
    return setDoc(messageRef, {
      creator: name,
      workoutName: data.workoutName,
      workoutId: randomId,
      isPrivate: isPrivate,
      createdAt: currentTime,
      favorite: false,
      workoutExercises: [...data.exercises],
    });
}

export function addWorkoutToMain(uid, workoutName, randomId, isPrivate, currentTime, exercises) {
    return setDoc(doc(database, "workouts", randomId), {
        creator: uid,
        workoutName: workoutName,
        workoutId: randomId,
        isPrivate: isPrivate,
        createdAt: currentTime,
        favorite: false,
        workoutExercises: [...exercises],
    });
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export async function getUsername(user) {
  const docRef = doc(database, "users", user.uid)
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().username;
  }
}