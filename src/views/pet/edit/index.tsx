import React, { useState, useEffect, useCallback } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker from 'react-native-ui-datepicker';
import { showMessage } from 'react-native-flash-message';

import { getUserPetsReference } from '@services/firebase/firestore';
import { captureException } from '@services/exceptionsHandler';

import Header from '@components/header';
import ActionButton from '@components/actionButton';
import Button from '@components/button';
import Loading from '@components/loading';
import Padding from '@components/padding';

import {
	Container,
	Content,
	Input,
	RadioButtonContainer,
	RadioButtonContent,
	RadioButton,
	RadioButtonLabel,
	Label,
} from '../add/styles';

const EditPet: React.FC = () => {
	const { pop } = useNavigation<NativeStackNavigationProp<AppRoutes>>();
	const { params } = useRoute<RouteProp<AppRoutes, 'PetEdit'>>();

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [name, setName] = useState<string>('');

	const [species, setSpecies] = useState<'dog' | 'cat' | null>(null);

	const [date, setDate] = useState<Date>(new Date());
	const [useBirthDate, setUseBirthDate] = useState<boolean>(false);

	const [breed, setBreed] = useState<string | undefined>();
	const [weight, setWeight] = useState<number | undefined>();
	const [healthNotes, setHealthNotes] = useState<string | undefined>();

	const onWeightChange = useCallback((value: string) => {
		const convertedWeight = Number(value);
		if (isNaN(convertedWeight)) return;

		setWeight(convertedWeight);
	}, []);

	const loadData = useCallback(async () => {
		try {
			setIsLoading(true);
			if (params) {
				const petsReference = await getUserPetsReference();

				if (petsReference) {
					const petsSnapshot = await petsReference
						.doc(params.id)
						.get();

					if (petsSnapshot.exists) {
						const pet = petsSnapshot.data() as IPet;

						setName(pet.name);
						setSpecies(pet.species);
						setBreed(pet.breed || undefined);
						setWeight(pet.weight || undefined);
						setHealthNotes(pet.health_notes || undefined);

						if (pet.birth_date) {
							setDate(pet.birth_date);
						}
					}
				}
			}
		} catch (error) {
			captureException({ error, showAlert: true });
		} finally {
			setIsLoading(false);
		}
	}, [params]);

	const handleUpdate = useCallback(async () => {
		try {
			setIsLoading(true);

			const petsReference = await getUserPetsReference();

			if (petsReference) {
				await petsReference.doc(params.id).update({
					name,
					species,
					breed: breed || null,
					weight: weight || null,
					health_notes: healthNotes || null,
					birth_date: useBirthDate ? date : null,
				});

				showMessage({
					message: 'Pet atualizado com sucesso',
					type: 'success',
				});

				pop();
			}
		} catch (error) {
			captureException({ error, showAlert: true });
		} finally {
			setIsLoading(false);
		}
	}, [
		name,
		species,
		breed,
		weight,
		healthNotes,
		useBirthDate,
		date,
		pop,
		params,
	]);

	const handleDelete = useCallback(async () => {
		try {
			setIsLoading(true);

			const petsReference = await getUserPetsReference();

			if (petsReference) {
				await petsReference.doc(params.id).delete();
			}

			showMessage({
				message: 'Pet excluido com sucesso',
				type: 'success',
			});

			pop(2);
		} catch (error) {
			captureException({ error, showAlert: true });
		} finally {
			setIsLoading(false);
		}
	}, [params.id, pop]);

	useEffect(() => {
		loadData();
	}, []);

	return (
		<Container>
			<Header />

			<ActionButton
				iconName="trash-outline"
				title="Excluir pet"
				onPress={handleDelete}
			/>

			{isLoading ? (
				<Loading />
			) : (
				<Content>
					<Input
						placeholder="Nome do pet"
						value={name}
						onChangeText={setName}
					/>

					<Label>Espécie</Label>

					<RadioButtonContainer>
						<RadioButtonContent>
							<RadioButton
								value="Cachorro"
								status={
									species === 'dog' ? 'checked' : 'unchecked'
								}
								onPress={() => setSpecies('dog')}
							/>
							<RadioButtonLabel>Cachorro</RadioButtonLabel>
						</RadioButtonContent>

						<RadioButtonContent>
							<RadioButton
								value="Gato"
								status={
									species === 'cat' ? 'checked' : 'unchecked'
								}
								onPress={() => setSpecies('cat')}
							/>
							<RadioButtonLabel>Gato</RadioButtonLabel>
						</RadioButtonContent>

						<RadioButtonContent>
							<RadioButton
								value="null"
								status={
									species === null ? 'checked' : 'unchecked'
								}
								onPress={() => setSpecies(null)}
							/>
							<RadioButtonLabel>Outro</RadioButtonLabel>
						</RadioButtonContent>
					</RadioButtonContainer>

					<Input
						placeholder="Raça"
						value={breed}
						onChangeText={setBreed}
					/>
					<Input
						placeholder="Peso"
						keyboardType="numeric"
						value={weight?.toString()}
						onChangeText={onWeightChange}
					/>

					<Input
						placeholder="Observações"
						multiline
						numberOfLines={5}
						value={healthNotes}
						onChangeText={setHealthNotes}
					/>

					{useBirthDate && (
						<>
							<Label>Data de nascimento</Label>

							<DateTimePicker
								mode="single"
								date={date}
								onChange={change => {
									console.log(change);
								}}
							/>
						</>
					)}

					<Button title="Salvar" onPress={handleUpdate} />
				</Content>
			)}

			<Padding />
		</Container>
	);
};

export default EditPet;
