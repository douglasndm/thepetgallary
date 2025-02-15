import React, { useState, useCallback, useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { collection, doc } from '@react-native-firebase/firestore';

import { getUserPetsReference } from '@services/firebase/firestore';
import { captureException } from '@services/exceptionsHandler';

import Header from '@components/header';
import ActionButton from '@components/actionButton';
import Loading from '@components/loading';
import Padding from '@components/padding';

import { formatDate } from '@utils/data';

import {
	Container,
	VaccineContainer,
	VaccineContent,
	TextContainer,
	VaccineName,
	VaccineDate,
} from './styles';

const VaccinesList: React.FC = () => {
	const { navigate, addListener } =
		useNavigation<NativeStackNavigationProp<AppRoutes>>();
	const { params } = useRoute<RouteProp<AppRoutes, 'VaccinesList'>>();

	const [isLoading, setIsLoading] = useState(true);

	const [vaccines, setVaccines] = useState<IVaccine[]>([]);

	const loadData = useCallback(async () => {
		try {
			setIsLoading(true);
			const petsReference = await getUserPetsReference();

			if (petsReference) {
				const petRef = doc(petsReference, params.petId);
				const vaccinesCollection = collection(petRef, 'vaccines');

				vaccinesCollection.onSnapshot(snapshot => {
					const localVaccines: IVaccine[] = [];

					snapshot.docs.forEach(localDoc => {
						const vaccine = localDoc.data();

						localVaccines.push({
							id: localDoc.id,
							name: vaccine.name,
							date_administered: vaccine.date_administered
								? vaccine.date_administered.toDate()
								: null,
							next_dose_date: vaccine.next_dose_date
								? vaccine.next_dose_date.toDate()
								: null,
							notes: vaccine.notes,
						});
					});

					setVaccines(localVaccines);
				});
			}
		} catch (error) {
			captureException({
				error,
				showAlert: true,
			});
		} finally {
			setIsLoading(false);
		}
	}, [params.petId]);

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		const unsubscribe = addListener('focus', () => {
			loadData();
		});

		return unsubscribe;
	}, [addListener]);

	const navigateToAddVaccine = useCallback(() => {
		navigate('VaccinesAdd', { petId: params.petId });
	}, [params.petId, navigate]);

	const navigateToVaccine = useCallback(
		(id: string) => {
			navigate('VaccinesDetails', { petId: params.petId, id });
		},
		[params.petId, navigate]
	);

	return (
		<Container>
			<Header />

			<ActionButton
				title="Adicionar vacina"
				iconName="create-outline"
				onPress={navigateToAddVaccine}
			/>

			{isLoading && <Loading />}

			{vaccines.map(vaccine => {
				let formattedDate: string | null = null;

				if (vaccine.date_administered) {
					formattedDate = formatDate(
						new Date(vaccine.date_administered)
					);
				}

				return (
					<VaccineContainer key={vaccine.id}>
						<VaccineContent
							onPress={() =>
								navigateToVaccine(vaccine.id.toString())
							}
						>
							<TextContainer>
								<VaccineName>{vaccine.name}</VaccineName>
								{!!formattedDate && (
									<VaccineDate>
										{`Data da aplicação: ${formattedDate}`}
									</VaccineDate>
								)}
							</TextContainer>
						</VaccineContent>
					</VaccineContainer>
				);
			})}
			<Padding />
		</Container>
	);
};

export default VaccinesList;
