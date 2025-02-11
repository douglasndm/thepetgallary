import auth from '@react-native-firebase/auth';
import firestore, {
	FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import netInfo from '@react-native-community/netinfo';

async function getUserPetsReference(): Promise<FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData> | null> {
	const { isConnected, isInternetReachable } = await netInfo.fetch();
	const user = auth().currentUser;

	if (!isConnected && isInternetReachable) {
		console.log(
			'Internet is not available, returning null as user pets reference'
		);
		return null;
	}

	if (!auth().currentUser || !user) {
		console.log(
			'User is not logged in, returning null as user pets reference'
		);
		return null;
	}

	const collection = firestore()
		.collection('users')
		.doc(user.uid)
		.collection('pets');

	return collection;
}

export { getUserPetsReference };
