import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	Firestore,
	setDoc,
	doc,
	addDoc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore/lite';

const firebaseConfig = {
	apiKey: 'AIzaSyDck14uRSoyS-GIaxvO-2-IofHZyf4g3ss',
	authDomain: 'eindwerk-artevelde.firebaseapp.com',
	projectId: 'eindwerk-artevelde',
	storageBucket: 'eindwerk-artevelde.appspot.com',
	messagingSenderId: '793542773597',
	appId: '1:793542773597:web:8773fb49b19324dfc576b4',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get a list of cities from your database
export async function getWorkouts() {
	const workoutCol = collection(db, 'workouts');
	const workoutSnapshot = await getDocs(workoutCol);
	const workoutList = workoutSnapshot.docs.map((doc) => {
		let workoutArray = doc.data();
		// add aray to workoutList
		workoutArray.id = doc.id;
		return workoutArray;
	});
	return workoutList;
}

export async function updateWorkouts(
	id: any,
	title: string | undefined,
	description: string | undefined,
	imageUrl: string | undefined
) {
	await updateDoc(doc(db, 'workouts', id), {
		title: title,
		description: description,
		image: imageUrl,
	});
}

export async function createWorkout(
	title: string,
	description: string,
	imageUrl: string,
	exercises: { name: string; value: boolean }[]
) {
	const docRef = collection(db, 'workouts');
	await setDoc(doc(docRef), {
		title: title,
		description: description,
		image: imageUrl,
		exercises: exercises,
	});
}

// remove workout from database
export async function removeWorkout(id: any) {
	await deleteDoc(doc(db, 'workouts', id));
}
