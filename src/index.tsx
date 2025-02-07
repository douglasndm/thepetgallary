import React, { useState } from 'react';
import {
	NavigationContainer,
	NavigationContainerRef,
} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { useNetInfo } from '@react-native-community/netinfo';

import CurrentPhotoContext from '@contexts/currentPhoto';
import CurrentViewContext from '@contexts/currentView';

import TabMenu from '@components/tabmenu';
import NoInternet from '@components/NoInternet';

import Routes from './routes';

const navigationIntegration = Sentry.reactNavigationIntegration({
	enableTimeToInitialDisplay: true,
});

const App: React.FC = () => {
	const containerRef = React.useRef<NavigationContainerRef<AppRoutes>>(null);

	const [currentView, setCurrentView] = useState<ICurrentView>('Dog');
	const [currentPhoto, setCurrentPhoto] = useState<APIItem | null>(null);

	const { isInternetReachable } = useNetInfo();

	return (
		<NavigationContainer
			ref={containerRef}
			onReady={() => {
				navigationIntegration.registerNavigationContainer(containerRef);
			}}
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
