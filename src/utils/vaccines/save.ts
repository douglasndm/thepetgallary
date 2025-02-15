import { collection, addDoc, doc } from '@react-native-firebase/firestore';

import { getUserPetsReference } from '@services/firebase/firestore';

interface Props {
	petId: string;
	vaccine: Omit<IVaccine, 'id'>;
}

async function saveVaccine({ petId, vaccine }: Props): Promise<void> {
	const userPetsReference = await getUserPetsReference();

	if (userPetsReference) {
		const petDoc = doc(userPetsReference, petId);
		const vaccinesCollection = collection(petDoc, 'vaccines');

		await addDoc(vaccinesCollection, vaccine);
	}
}

export { saveVaccine };
