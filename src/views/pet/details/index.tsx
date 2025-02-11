import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import data from '@services/data.json';

import Header from '@components/header';

import {
	Container,
	Content,
	Icon,
	Name,
	Species,
	Breed,
	BirthDate,
	Weight,
	HealthNotes,
	ActionButtonContainer,
	ActionButtonIcon,
	ActionButtonText,
} from './styles';

const PetDetails: React.FC = () => {
	const { navigate } = useNavigation<NativeStackNavigationProp<AppRoutes>>();
	const { params } = useRoute<RouteProp<AppRoutes, 'PetDetails'>>();

	const [petInfo, setPetInfo] = useState<IPet>();

	useEffect(() => {
		const pet = data.find(item => item.id === params.id);

		setPetInfo(pet);
	}, [params.id]);

	const iconName = useMemo(() => {
		if (petInfo?.species) {
			if (petInfo.species === 'dog') {
				return 'dog';
			} else if (petInfo.species === 'cat') {
				return 'cat';
			}
		}
	}, [petInfo]);

	const birthDate = useMemo(() => {
		if (!petInfo?.birth_date) return null;

		const date = new Date(petInfo.birth_date);
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		} as const;
		const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(
			date
		);

		return formattedDate;
	}, [petInfo]);

	const navigateToEditPet = useCallback(() => {
		navigate('PetEdit', { id: params.id });
	}, [navigate, params.id]);

	return (
		<Container>
			<Header />

			<ActionButtonContainer onPress={navigateToEditPet}>
				<ActionButtonIcon name="create-outline" />
				<ActionButtonText>Editar pet</ActionButtonText>
			</ActionButtonContainer>

			<Content>
				{!!iconName && <Icon name={iconName} />}

				<Name>{petInfo?.name}</Name>

				{petInfo?.species && (
					<Species>
						Especie:{' '}
						{petInfo?.species === 'dog' ? 'Cachorro' : 'Gato'}
					</Species>
				)}

				{petInfo?.breed && <Breed>Raça: {petInfo?.breed}</Breed>}

				{birthDate && <BirthDate>Nascimento: {birthDate}</BirthDate>}

				{petInfo?.weight && <Weight>Peso: {petInfo?.weight}KG</Weight>}

				{petInfo?.health_notes && (
					<HealthNotes>
						Dados adicionais: {petInfo?.health_notes}
					</HealthNotes>
				)}
			</Content>
		</Container>
	);
};

export default PetDetails;
