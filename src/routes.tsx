import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@views/home';
import PlacesList from '@views/places/list';

const Stack = createNativeStackNavigator<AppRoutes>();

const routes: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="PlacesList" component={PlacesList} />
		</Stack.Navigator>
	);
};

export default routes;
