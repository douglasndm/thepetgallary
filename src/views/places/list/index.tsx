import React, { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from '@react-native-vector-icons/ionicons';

import Header from '@components/header';
import Padding from '@components/padding';
import Loading from '@components/loading';

import { Container, Title, Content, PlaceButton, PlaceName } from './styles';

interface PlaceItem {
	instagram: string;
	name: string;
}

const PlacesList: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [places, setPlaces] = useState<PlaceItem[]>([]);

	const loadData = useCallback(async () => {
		try {
			setIsLoading(true);

			console.log('oi');

			const placesResponse = await firestore()
				.collection('adoptionsPlaces')
				.get();

			const localPlaces: PlaceItem[] = [];

			console.log(placesResponse);

			placesResponse.forEach(doc => {
				localPlaces.push(doc.data() as PlaceItem);
			});

			setPlaces(localPlaces);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, []);

	return (
		<Container>
			<Header />

			<Content>
				<Title>Lugares para adoção</Title>

				{isLoading && <Loading />}

				{places.map(place => (
					<PlaceButton
						onPress={() => Linking.openURL(place.instagram)}
					>
						<Icon name="logo-instagram" size={30} color="#363535" />
						<PlaceName>{place.name}</PlaceName>
					</PlaceButton>
				))}
			</Content>

			<Padding size={100} />
		</Container>
	);
};

export default PlacesList;
