import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth, FirebaseAuthTypes } from '@react-native-firebase/auth';

import Header from '@components/header';
import Button from '@components/button';

import DeleteAccount from './Delete';

import { Container, Content, Name, Email } from './styles';

const Profile: React.FC = () => {
	const { replace } = useNavigation<NativeStackNavigationProp<AppRoutes>>();

	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleLogout = useCallback(async () => {
		await getAuth().signOut();

		replace('Login', {});
	}, [replace]);

	useEffect(() => {
		getAuth().onAuthStateChanged(currentUser => {
			setUser(currentUser);
		});
	}, []);

	const switchShowDeleteModal = useCallback(() => {
		setShowDeleteModal(prevValue => !prevValue);
	}, []);

	return (
		<Container>
			<Header />

			<Content>
				<Name>{user?.displayName}</Name>
				<Email>{user?.email}</Email>

				<Button title="Sair da conta" onPress={handleLogout} />

				<Button
					title="Apagar conta"
					onPress={switchShowDeleteModal}
					style={{ marginTop: 10 }}
				/>
			</Content>

			<DeleteAccount
				visible={showDeleteModal}
				setVisible={setShowDeleteModal}
			/>
		</Container>
	);
};

export default Profile;
