interface IAdoptionPlace {
	name: string;
	instagram: string | null;
	facebook: string | null;
	whatsapp: string | null;
	url: string | null;
	UF?: string;
	city?: string;
	City?: string;
}

type GroupedAdoptionPlace = {
	[uf: string]: {
		withCity: IAdoptionPlace[];
		withoutCity: IAdoptionPlace[];
	};
};
