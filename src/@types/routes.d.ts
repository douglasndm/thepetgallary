type AppRoutes = {
	DogsView: {};
	CatsView: {};

	Home: {};
	PlacesList: {};
	Menu: {};
	Login: {};
	Profile: {};

	PetList: {};
	PetAdd: {};
	PetEdit: {
		id: string;
	};
	PetDetails: {
		id: string;
	};

	VaccinesList: {
		petId: string;
	};
	VaccinesAdd: {
		petId: string;
	};
	VaccinesEdit: {
		petId: string;
		id: string;
	};
	VaccinesDetails: {
		petId: string;
		id: string;
	};
};
