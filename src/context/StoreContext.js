import { database } from '../firebase';
import {
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    Timestamp,
    updateDoc,
    arrayUnion,
    arrayRemove,
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore';

export function addUserToCollection(uid, username, email) {
    return setDoc(doc(database, "users", uid), {
        username: username,
        email: email,
        favoritedWorkouts: [],
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

// Delete workout from user's collection
export async function deleteWorkoutFromCollecton(user, workoutName, isPrivate) {
    try {
        // Delete workout from user's (private or public) collection
        let subcollectionName = isPrivate ? "Private Workouts" : "Public Workouts";
        const userCollectionRef = doc(database, "users", user.uid, subcollectionName, workoutName);
        await deleteDoc(userCollectionRef);
        // Delete workout from main collection
        const mainCollectionRef = doc(database, "workouts", workoutName);
        await deleteDoc(mainCollectionRef);
        return true;
    } catch (error) {
        console.error("Error deleting workout: ", error);
        return false;
    }
}


export async function updateFavoriteWorkout(user, workoutName, workoutId, isPrivate, favoriteValue) {
    let subcollectionName = isPrivate ? "Private Workouts" : "Public Workouts";
    const ref = doc(database, "users", user.uid, subcollectionName, workoutName);
    const mainRef = doc(database, "workouts", workoutId);
    try {
        // Update favorite in user's collection
        await updateDoc(ref, {
            favorite: favoriteValue,
        });
        // Update favorite in main collection
        await updateDoc(mainRef, {
            favorite: favoriteValue,
        });
        return true;
    } catch (error) {
        console.error("Error updating favorite: ", error);
        return false;
    }
}

export async function addFavoriteWorkoutToUserDocument(user, workoutId) {
    const ref = doc(database, "users", user.uid);
    try {
        await updateDoc(ref, {
            favoritedWorkouts: arrayUnion(workoutId),
        });
        return true;
    } catch (error) {
        console.error("Error updating favorite: ", error);
        return false;
    }
}

export async function removeFavoriteWorkoutFromUserDocument(user, workoutId) {
    const ref = doc(database, "users", user.uid);
    try {
        await updateDoc(ref, {
            favoritedWorkouts: arrayRemove(workoutId),
        });
        return true;
    } catch (error) {
        console.error("Error removing favorite: ", error);
        return false;
    }
}

// Get all workouts from user's collection
export async function getUserFavoritedWorkouts(user) {
    const ref = doc(database, "users", user.uid);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        return docSnap.data().favoritedWorkouts;
    }
}

// Get all workouts from workouts collection
export async function getFavoritedWorkoutsFromCollection(user) {
    try {
        const favoritedWorkouts = await getUserFavoritedWorkouts(user);
        if (favoritedWorkouts.length === 0) throw ('No favoriteded workouts');
        const workoutsRef = collection(database, 'workouts');
        const workoutsQuery = query(workoutsRef, where('workoutId', 'in', favoritedWorkouts));
        const querySnapshot = await getDocs(workoutsQuery);
        const workoutList = querySnapshot.docs.map((doc) => doc.data());
        return workoutList;
    } catch (error) {
        console.error('Error in getFavoritedWorkoutsFromCollection: ', error);
        throw error;
    }
}

// Edit user's workout (in user document)
export async function editUserWorkout(user, workoutName, isPrivate, newExercises) {
    try {
        let subcollectionName = isPrivate ? "Private Workouts" : "Public Workouts";
        const docRef = doc(database, "users", user.uid, subcollectionName, workoutName);
        await updateDoc(docRef, {
            workoutExercises: newExercises,
        });
    } catch (error) {
        console.error("Error editing workout (in-context)): ", error);
    }
}

// Edit user's workout (in main document)
export async function editMainWorkout(workoutId, newExercises) {
    try {
        const docRef = doc(database, "workouts", workoutId);
        await updateDoc(docRef, {
            workoutExercises: newExercises,
        });
    } catch (error) {
        console.error("Error editing workout (main): ", error);
    }
}

// Delete user document from users collection
export async function deleteUserDocument(user) {
    await deleteDoc(doc(database, "users", user.uid));
}