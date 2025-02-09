import React, { useState, useEffect, useCallback } from 'react';
import { Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import Header from '@components/header';

import { Container } from './styles';

const Profile: React.FC = () => {
	const { replace } = useNavigation<NativeStackNavigationProp<AppRoutes>>();

	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

	const handleLogout = useCallback(async () => {
		await auth().signOut();

		replace('Login', {});
	}, [replace]);

	useEffect(() => {
		auth().onAuthStateChanged(currentUser => {
			setUser(currentUser);
		});
	}, []);

	return (
		<Container>
			<Header />

			{!!user && <Text>{JSON.stringify(user)}</Text>}

			<Button title="Logout" onPress={handleLogout} />
		</Container>
	);
};

export default Profile;
