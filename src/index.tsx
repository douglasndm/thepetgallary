import React, { useCallback, useState } from 'react';
import {
	NavigationContainer,
	NavigationContainerRef,
} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import EnvConfig from 'react-native-config';
import analytics from '@react-native-firebase/analytics';
import { SystemBars } from 'react-native-edge-to-edge';
import { useNetInfo } from '@react-native-community/netinfo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import '@services/firebase/appchecker';

import '@utils/permissions/notifications';

import CurrentPhotoContext from '@contexts/currentPhoto';
import CurrentViewContext from '@contexts/currentView';

import TabMenu from '@components/tabmenu';
import NoInternet from '@components/NoInternet';
import Notifications from './components/notifications';

import Routes from './routes';

GoogleSignin.configure({
	webClientId: EnvConfig.GOOGLE_CLIENT_ID_ANDROID,
});

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
			<SafeAreaProvider>
				<CurrentViewContext.Provider
					value={{ currentView, setCurrentView }}
				>
					<CurrentPhotoContext.Provider
						value={{ currentPhoto, setCurrentPhoto }}
					>
						<SystemBars style="dark" hidden={false} />
						{!isInternetReachable && <NoInternet />}
						<Notifications />
						<Routes />
						<TabMenu
							currentView={currentView}
							onPress={setCurrentView}
						/>

						<FlashMessage
							position="top"
							statusBarHeight={40}
							duration={6000}
						/>
					</CurrentPhotoContext.Provider>
				</CurrentViewContext.Provider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
};

export default App;
