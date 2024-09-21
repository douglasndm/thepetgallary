import React, { useState} from 'react';

import TabMenu from '@components/tabmenu';

import Home from '@views/home';

const src: React.FC = () => {
    const [currentView, setCurrentView] = useState<'Dog' | 'Cat' | 'Menu'>('Dog');

    return (
        <>
            <Home currentView={currentView} />
            <TabMenu currentView={currentView} onPress={setCurrentView} />
        </>
    );
};

export default src;
