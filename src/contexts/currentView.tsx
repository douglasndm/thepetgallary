import { createContext } from 'react';

interface currentViewContextType {
	currentView: ICurrentView;
	setCurrentView: React.Dispatch<React.SetStateAction<ICurrentView>>;
}

const currentView = createContext<currentViewContextType | undefined>(
	undefined
);

export default currentView;
