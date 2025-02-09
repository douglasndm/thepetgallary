import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@views/home';
import PlacesList from '@views/places/list';
import Menu from '@views/menu';
import Login from '@views/auth/login';

const Stack = createNativeStackNavigator<AppRoutes>();

const routes: React.FC = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="PlacesList" component={PlacesList} />
			<Stack.Screen name="Menu" component={Menu} />
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
};

export default routes;
