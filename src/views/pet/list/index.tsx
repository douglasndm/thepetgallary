import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import data from '@services/data.json';

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
	ActionButtonContainer,
	ActionButtonIcon,
	ActionButtonText,
} from './styles';

const PetList: React.FC = () => {
	const { navigate } = useNavigation<NativeStackNavigationProp<AppRoutes>>();

	const navigateToPet = useCallback(
		(id: string) => {
			navigate('PetDetails', { id });
		},
		[navigate]
	);

	const navigateToAddPet = useCallback(() => {
		navigate('PetAdd', {});
	}, [navigate]);

	return (
		<Container>
			<Header />

			<ActionButtonContainer onPress={navigateToAddPet}>
				<ActionButtonIcon name="add" />
				<ActionButtonText>Adicionar pet</ActionButtonText>
			</ActionButtonContainer>

			{data.map(pet => {
				let specieIcon: 'dog' | 'cat' | null = null;

				if (pet.species === 'dog' || pet.species === 'Cachorro') {
					specieIcon = 'dog';
				} else if (pet.species === 'cat' || pet.species === 'Gato') {
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

			<Padding />
		</Container>
	);
};

export default PetList;
