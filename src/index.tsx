import React, { useCallback, useState } from 'react';
import {
	NavigationContainer,
	NavigationContainerRef,
} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import analytics from '@react-native-firebase/analytics';
import { SystemBars } from 'react-native-edge-to-edge';
import { useNetInfo } from '@react-native-community/netinfo';

import '@services/firebase/appchecker';

import CurrentPhotoContext from '@contexts/currentPhoto';
import CurrentViewContext from '@contexts/currentView';

import TabMenu from '@components/tabmenu';
import NoInternet from '@components/NoInternet';

import Routes from './routes';

const navigationIntegration = Sentry.reactNavigationIntegration({
	enableTimeToInitialDisplay: true,
});

const App: React.FC = () => {
	const routeNameRef = React.useRef<string | undefined>(undefined);
	const navigationRef = React.useRef<NavigationContainerRef<AppRoutes>>(null);

	const [currentView, setCurrentView] = useState<ICurrentView>('Dog');
	const [currentPhoto, setCurrentPhoto] = useState<APIItem | null>(null);

	const { isInternetReachable } = useNetInfo();

	const onRouteChange = useCallback(async () => {
		if (__DEV__) return;
		if (!navigationRef || !navigationRef.current) return;

		const previousRouteName = routeNameRef.current;
		const currentRouteName = navigationRef.current.getCurrentRoute()?.name;

		if (previousRouteName !== currentRouteName) {
			await analytics().logScreenView({
				screen_name: currentRouteName,
				screen_class: currentRouteName,
			});
		}

		if (currentRouteName) {
			routeNameRef.current = currentRouteName;
		}
	}, []);

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				navigationIntegration.registerNavigationContainer(
					navigationRef
				);
			}}
			onStateChange={onRouteChange}
		>
			<CurrentViewContext.Provider
				value={{ currentView, setCurrentView }}
			>
				<CurrentPhotoContext.Provider
					value={{ currentPhoto, setCurrentPhoto }}
				>
					<SystemBars style="dark" hidden={false} />
					{!isInternetReachable && <NoInternet />}

					<Routes />
					<TabMenu
						currentView={currentView}
						onPress={setCurrentView}
					/>
				</CurrentPhotoContext.Provider>
			</CurrentViewContext.Provider>
		</NavigationContainer>
	);
};

export default App;
