import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker from 'react-native-ui-datepicker';
import { showMessage } from 'react-native-flash-message';

import { captureException } from '@services/exceptionsHandler';

import { savePet } from '@utils/pets/save';

import Header from '@components/header';
import Padding from '@components/padding';
import Button from '@components/button';

import {
	Container,
	Content,
	Input,
	RadioButtonContainer,
	RadioButtonContent,
	RadioButton,
	RadioButtonLabel,
	Label,
} from './styles';

const AddPet: React.FC = () => {
	const { pop } = useNavigation<NativeStackNavigationProp<AppRoutes>>();

	const [isSaving, setIsSaving] = useState<boolean>(false);

	const [name, setName] = useState<string>('');

	const [species, setSpecies] = useState<'dog' | 'cat' | null>(null);

	const [date, setDate] = useState<Date>(new Date());
	const [useBirthDate, setUseBirthDate] = useState<boolean>(false);

	const [breed, setBreed] = useState<string>('');
	const [weight, setWeight] = useState<number>();
	const [healthNotes, setHealthNotes] = useState<string>('');

	const onWeightChange = useCallback((value: string) => {
		const convertedWeight = Number(value);
		setWeight(convertedWeight);
	}, []);

	const onBirthDateChange = useCallback(value => {
		setDate(value.date);
	}, []);

	const handleSave = useCallback(async () => {
		try {
			setIsSaving(true);

			await savePet({
				name,
				species,
				breed,
				birth_date: useBirthDate ? date : null,
				weight: weight || null,
				health_notes: healthNotes,
			});

			showMessage({
				message: 'Pet cadastrado com sucesso',
				type: 'success',
			});

			pop();
		} catch (error) {
			captureException({ error, showAlert: true });
		} finally {
			setIsSaving(false);
		}
	}, [name, species, breed, weight, healthNotes, date, useBirthDate, pop]);

	return (
		<Container>
			<Header />

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
							status={species === 'dog' ? 'checked' : 'unchecked'}
							onPress={() => setSpecies('dog')}
						/>
						<RadioButtonLabel>Cachorro</RadioButtonLabel>
					</RadioButtonContent>

					<RadioButtonContent>
						<RadioButton
							value="Gato"
							status={species === 'cat' ? 'checked' : 'unchecked'}
							onPress={() => setSpecies('cat')}
						/>
						<RadioButtonLabel>Gato</RadioButtonLabel>
					</RadioButtonContent>

					<RadioButtonContent>
						<RadioButton
							value="null"
							status={species === null ? 'checked' : 'unchecked'}
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
							onChange={onBirthDateChange}
						/>
					</>
				)}

				<Button
					title="Salvar"
					onPress={handleSave}
					disabled={isSaving}
				/>
			</Content>

			<Padding />
		</Container>
	);
};

export default AddPet;
