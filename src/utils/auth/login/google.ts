import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';

async function signInWithGoogle(): Promise<FirebaseAuthTypes.UserCredential> {
	// Check if your device supports Google Play
	await GoogleSignin.hasPlayServices({
		showPlayServicesUpdateDialog: true,
	});
	// Get the users ID token
	const signInResult = await GoogleSignin.signIn();

	// Try the new style of google-sign in result, from v13+ of that module
	let idToken = signInResult.data?.idToken;

	if (!idToken) {
		throw new Error('No ID token found');
	}

	if (!signInResult || !signInResult.data) {
		throw new Error('No ID token found');
	}

	// Create a Google credential with the token
	const googleCredential = auth.GoogleAuthProvider.credential(
		signInResult.data.idToken
	);

	// Sign-in the user with the credential
	return auth().signInWithCredential(googleCredential);
}

export { signInWithGoogle };
