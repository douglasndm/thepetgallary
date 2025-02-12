import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getUserPetsReference } from '@services/firebase/firestore';
import { captureException } from '@services/exceptionsHandler';

import Header from '@components/header';
import Loading from '@components/loading';

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
	const { navigate, addListener } =
		useNavigation<NativeStackNavigationProp<AppRoutes>>();
	const { params } = useRoute<RouteProp<AppRoutes, 'PetDetails'>>();

	const [isLoading, setIsLoading] = useState(true);
	const [petInfo, setPetInfo] = useState<IPet>();

	const loadData = useCallback(async () => {
		try {
			setIsLoading(true);
			const petsReference = await getUserPetsReference();

			if (petsReference) {
				const petsSnapshot = await petsReference.doc(params.id).get();

				if (petsSnapshot.exists) {
					const pet = petsSnapshot.data() as IPet;

					let birthDate: Date | null = null;

					if (petsSnapshot.data()?.birth_date) {
						birthDate = petsSnapshot.data()?.birth_date.toDate();
					}

					setPetInfo({
						id: petsSnapshot.id,
						name: pet.name,
						breed: pet.breed,
						species: pet.species,
						weight: pet.weight,
						birth_date: birthDate,
						health_notes: pet.health_notes,
					});
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				if (error.message.includes('firestore/permission-denied')) {
					return;
				}
			}
			captureException({ error, showAlert: true });
		} finally {
			setIsLoading(false);
		}
	}, [params.id]);

	useEffect(() => {
		loadData();
	}, []);

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

	useEffect(() => {
		const unsubscribe = addListener('focus', () => {
			loadData();
		});

		return unsubscribe;
	}, [addListener]);

	return (
		<Container>
			<Header />

			{!isLoading && (
				<ActionButtonContainer onPress={navigateToEditPet}>
					<ActionButtonIcon name="create-outline" />
					<ActionButtonText>Editar pet</ActionButtonText>
				</ActionButtonContainer>
			)}

			{isLoading ? (
				<Loading />
			) : (
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

					{birthDate && (
						<BirthDate>Nascimento: {birthDate}</BirthDate>
					)}

					{petInfo?.weight && (
						<Weight>Peso: {petInfo?.weight}KG</Weight>
					)}

					{petInfo?.health_notes && (
						<HealthNotes>
							Dados adicionais: {petInfo?.health_notes}
						</HealthNotes>
					)}
				</Content>
			)}
		</Container>
	);
};

export default PetDetails;
