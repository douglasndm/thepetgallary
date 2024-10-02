import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import CurrentPhotoContext from '@contexts/currentPhoto';
import CurrentViewContext from '@contexts/currentView';

import TabMenu from '@components/tabmenu';
import Modal from '@components/modal/image';
import NoInternet from '@components/NoInternet';

import Routes from './routes';

const src: React.FC = () => {
	const [currentView, setCurrentView] = useState<ICurrentView>('Dog');
	const [currentPhoto, setCurrentPhoto] = useState<APIItem | null>(null);

	const { isInternetReachable } = useNetInfo();

	return (
		<NavigationContainer>
			<CurrentViewContext.Provider
				value={{ currentView, setCurrentView }}
			>
				<CurrentPhotoContext.Provider
					value={{ currentPhoto, setCurrentPhoto }}
				>
					{!isInternetReachable && <NoInternet />}

					<Modal />
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

export default src;
