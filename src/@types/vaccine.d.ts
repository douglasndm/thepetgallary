interface IVaccine {
	id: string;
	name: string;
	date_administered: Date | null;
	next_dose_date: Date | null;
	notes: string | null;
}
