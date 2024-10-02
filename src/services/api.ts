import EnvConfig from 'react-native-config';
import axios from 'axios';

interface fetchPicturesProps {
	type: 'cat' | 'dog';
	page?: number;
}
async function fetchPictures({
	type,
	page = 0,
}: fetchPicturesProps): Promise<APIItem[]> {
	const baseUrl =
		type === 'cat' ? EnvConfig.API_URL_CAT : EnvConfig.API_URL_DOG;

	const response = await axios.get<APIItem[]>(
		`${baseUrl}/v1/images/search?page=${page}&limit=10`,
		{
			headers: {
				//'x-api-key': EnvConfig.API_KEY,
			},
		}
	);

	return response.data;
}

export { fetchPictures };
