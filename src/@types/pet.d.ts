interface IPet {
	id: string;
	name: string;
	breed: string | null;
	species: 'cat' | 'dog' | null;
	birth_date: Date | null;
	weight: number | null;
	health_notes: string | null;
}
