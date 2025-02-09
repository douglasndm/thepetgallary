import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import Header from '@components/header';
import Button from '@components/button';

import { Container, Content, Name, Email } from './styles';

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

			<Content>
				<Name>{user?.displayName}</Name>
				<Email>{user?.email}</Email>

				<Button title="Sair da conta" onPress={handleLogout} />
			</Content>
		</Container>
	);
};

export default Profile;
