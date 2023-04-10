
// Checks if the user is the creator of the workout
export function checkIfUserCreated(workoutCreator, user) {
    if ( workoutCreator === user ) {
        return true;
    } else {
        return false;
    }
}

export function getWorkoutLink(workoutId) {
    return `workouts/${workoutId}`;
}