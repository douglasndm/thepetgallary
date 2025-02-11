import { getUserPetsReference } from '@services/firebase/firestore';

async function savePet(pet: Omit<IPet, 'id'>): Promise<void> {
	const userPetsReference = await getUserPetsReference();

	console.log(pet);

	if (userPetsReference) {
		await userPetsReference.add(pet);
	}
}

export { savePet };
