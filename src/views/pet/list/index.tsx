import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getUserPetsReference } from '@services/firebase/firestore';
import { captureException } from '@services/exceptionsHandler';

import Header from '@components/header';
import Padding from '@components/padding';

import {
	Container,
	PetContainer,
	PetContent,
	TextContainer,
	PetName,
	PetBreed,
	Icon,
	EmptyListName,
	ActionButtonContainer,
	ActionButtonIcon,
	ActionButtonText,
} from './styles';

const PetList: React.FC = () => {
	const { navigate, addListener } =
		useNavigation<NativeStackNavigationProp<AppRoutes>>();

	const [pets, setPets] = useState<IPet[]>([]);

	const loadData = useCallback(async () => {
		try {
			const petsReference = await getUserPetsReference();

			if (petsReference) {
				const petsSnapshot = await petsReference.get();

				const localPets: IPet[] = [];

				petsSnapshot.forEach(doc => {
					const pet = doc.data() as IPet;
					localPets.push({
						...pet,
						id: doc.id,
					});
				});

				setPets(localPets);
			}
		} catch (error) {
			if (error instanceof Error) {
				if (error.message.includes('firestore/permission-denied')) {
					return;
				}
			}
			captureException({ error, showAlert: true });
		}
	}, []);

	const navigateToPet = useCallback(
		(id: string) => {
			navigate('PetDetails', { id });
		},
		[navigate]
	);

	const navigateToAddPet = useCallback(() => {
		navigate('PetAdd', {});
	}, [navigate]);

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		const unsubscribe = addListener('focus', () => {
			loadData();
		});

		return unsubscribe;
	}, [addListener]);

	return (
		<Container>
			<Header />

			<ActionButtonContainer onPress={navigateToAddPet}>
				<ActionButtonIcon name="add" />
				<ActionButtonText>Adicionar pet</ActionButtonText>
			</ActionButtonContainer>

			{pets.map(pet => {
				let specieIcon: 'dog' | 'cat' | null = null;

				if (pet.species === 'dog') {
					specieIcon = 'dog';
				} else if (pet.species === 'cat') {
					specieIcon = 'cat';
				}

				return (
					<PetContainer key={pet.id}>
						<PetContent
							onPress={() => navigateToPet(pet.id.toString())}
						>
							<TextContainer>
								<PetName>{pet.name}</PetName>
								<PetBreed>{pet.breed}</PetBreed>
							</TextContainer>

							{specieIcon && <Icon name={specieIcon} />}
						</PetContent>
					</PetContainer>
				);
			})}

			{pets.length <= 0 && (
				<EmptyListName>
					Cadastre seus pets para facilitar o acompanhamento deles
				</EmptyListName>
			)}

			<Padding />
		</Container>
	);
};

export default PetList;
