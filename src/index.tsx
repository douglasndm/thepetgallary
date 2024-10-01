import React, { useState } from 'react';

import CurrentPhotoContext from '@contexts/currentPhoto';

import TabMenu from '@components/tabmenu';
import Modal from '@components/modal/image';

import Home from '@views/home';

const src: React.FC = () => {
	const [currentPhoto, setCurrentPhoto] = useState<APIItem | null>(null);

	const [currentView, setCurrentView] = useState<'Dog' | 'Cat' | 'Menu'>(
		'Dog'
	);

	return (
		<CurrentPhotoContext.Provider value={{ currentPhoto, setCurrentPhoto }}>
			<Modal />
			<Home currentView={currentView} />
			<TabMenu currentView={currentView} onPress={setCurrentView} />
		</CurrentPhotoContext.Provider>
	);
};

export default src;
