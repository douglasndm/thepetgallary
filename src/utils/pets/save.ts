import { getUserPetsReference } from '@services/firebase/firestore';

async function savePet(pet: Omit<IPet, 'id'>): Promise<void> {
	const userPetsReference = await getUserPetsReference();

	if (userPetsReference) {
		await userPetsReference.add(pet);
	}
}

export { savePet };
