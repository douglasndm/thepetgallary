interface IAdoptionPlace {
	name: string;
	instagram: string;
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
