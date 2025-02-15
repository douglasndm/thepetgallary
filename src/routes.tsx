import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DogsView from '@views/photos/list/dogs';
import CatsView from '@views/photos/list/cats';

import PlacesList from '@views/places/list';
import About from '@views/about';
import Login from '@views/auth/login';
import Profile from '@views/profile';

import PetList from '@views/pet/list';
import PetAdd from '@views/pet/add';
import PetEdit from '@views/pet/edit';
import PetDetails from '@views/pet/details';

import VaccinesList from '@views/vaccines/list';
import VaccinesAdd from '@views/vaccines/add';
import VaccinesEdit from '@views/vaccines/edit';
import VaccinesDetails from '@views/vaccines/details';

const Stack = createNativeStackNavigator<AppRoutes>();

const Routes: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="DogsView" component={DogsView} />
			<Stack.Screen name="CatsView" component={CatsView} />

			<Stack.Screen name="PlacesList" component={PlacesList} />
			<Stack.Screen name="About" component={About} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Profile" component={Profile} />

			<Stack.Screen name="PetList" component={PetList} />
			<Stack.Screen name="PetAdd" component={PetAdd} />
			<Stack.Screen name="PetEdit" component={PetEdit} />
			<Stack.Screen name="PetDetails" component={PetDetails} />

			<Stack.Screen name="VaccinesList" component={VaccinesList} />
			<Stack.Screen name="VaccinesAdd" component={VaccinesAdd} />
			<Stack.Screen name="VaccinesEdit" component={VaccinesEdit} />
			<Stack.Screen name="VaccinesDetails" component={VaccinesDetails} />
		</Stack.Navigator>
	);
};

export default Routes;
