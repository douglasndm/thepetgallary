import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import CurrentPhotoContext from '@contexts/currentPhoto';
import CurrentViewContext from '@contexts/currentView';

import TabMenu from '@components/tabmenu';
import Modal from '@components/modal/image';

import Routes from './routes';

const src: React.FC = () => {
	const [currentView, setCurrentView] = useState<ICurrentView>('Dog');
	const [currentPhoto, setCurrentPhoto] = useState<APIItem | null>(null);

	return (
		<NavigationContainer>
			<CurrentViewContext.Provider
				value={{ currentView, setCurrentView }}
			>
				<CurrentPhotoContext.Provider
					value={{ currentPhoto, setCurrentPhoto }}
				>
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
