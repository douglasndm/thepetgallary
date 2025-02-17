import React, { useState, useCallback } from 'react';
import { Dialog, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth, deleteUser } from '@react-native-firebase/auth';
import {
	getFirestore,
	collection,
	doc,
} from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';

import { captureException } from '@services/exceptionsHandler';

import Loading from '@components/loading';

interface Props {
	visible: boolean;
	setVisible: (visible: boolean) => void;
}

const DeleteAccount: React.FC<Props> = (props: Props) => {
	const { reset } = useNavigation<NativeStackNavigationProp<AppRoutes>>();

	const [isLoading, setIsLoading] = useState(false);

	const hideDialog = useCallback(() => {
		props.setVisible(false);
	}, [props]);

	const handleDelete = useCallback(async () => {
		try {
			setIsLoading(true);

			const user = getAuth().currentUser;

			if (!user) {
				console.log('User is not logged in');
				return;
			}

			// Referência para o documento do usuário
			const usersCollection = collection(getFirestore(), 'users');
			const userRef = doc(usersCollection, user.uid);

			// 2. Deletar documentos na subcoleção "pets" e suas subcoleções internas
			const petsSnapshot = await userRef.collection('pets').get();
			for (const petDoc of petsSnapshot.docs) {
				// 2.a. Deletar documentos na subcoleção "vaccines" do pet
				const vaccinesSnapshot = await petDoc.ref
					.collection('vaccines')
					.get();
				for (const vaccineDoc of vaccinesSnapshot.docs) {
					await vaccineDoc.ref.delete();
				}

				// 2.b. Deletar documentos na subcoleção "medications" do pet
				const medicationsSnapshot = await petDoc.ref
					.collection('medications')
					.get();
				for (const medicationDoc of medicationsSnapshot.docs) {
					await medicationDoc.ref.delete();
				}

				// 2.c. Deletar o documento do pet
				await petDoc.ref.delete();
			}

			// 3. Finalmente, deletar o documento do usuário
			await userRef.delete();

			await deleteUser(user);

			showMessage({
				message: 'Conta excluida com sucesso',
				type: 'success',
			});

			reset({ index: 0, routes: [{ name: 'DogsView' }] });
		} catch (error) {
			captureException({
				error,
				showAlert: true,
			});
		} finally {
			setIsLoading(false);
		}
	}, [reset]);

	return (
		<Dialog visible={props.visible} onDismiss={hideDialog}>
			<Dialog.Title>Você tem certeza?</Dialog.Title>

			{isLoading && <Loading />}

			<Dialog.Content>
				<Text variant="bodyMedium">
					Você vai excluir sua conta, incluindo pets e vacinas
					cadastradas, essa operação não pode ser desfeita.
				</Text>
			</Dialog.Content>
			<Dialog.Actions>
				<Button
					onPress={handleDelete}
					textColor="red"
					disabled={isLoading}
				>
					Apagar
				</Button>
				<Button onPress={hideDialog} disabled={isLoading}>
					Manter
				</Button>
			</Dialog.Actions>
		</Dialog>
	);
};

export default DeleteAccount;
