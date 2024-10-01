import { createContext } from 'react';

interface currentPhotoContextType {
	currentPhoto: APIItem | null;
	setCurrentPhoto: React.Dispatch<React.SetStateAction<APIItem | null>>;
}

const currentPhoto = createContext<currentPhotoContextType | undefined>(
	undefined
);

export default currentPhoto;
