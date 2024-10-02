import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Linking, ListRenderItem } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from '@react-native-vector-icons/ionicons';

import Header from '@components/header';
import Loading from '@components/loading';
import Padding from '@components/padding';

import {
	Container,
	Title,
	Content,
	PlaceButton,
	PlaceName,
	styles,
} from './styles';

interface PlaceItem {
	instagram: string;
	name: string;
}

const PlacesList: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [places, setPlaces] = useState<PlaceItem[]>([]);

	const loadData = useCallback(async () => {
		try {
			setLoading(true);

			const placesResponse = await firestore()
				.collection('adoptionsPlaces')
				.get();

			const localPlaces: PlaceItem[] = [];

			placesResponse.forEach(doc => {
				localPlaces.push(doc.data());
			});

			setPlaces(localPlaces);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, []);

	const renderItem: ListRenderItem<PlaceItem> = useCallback(({ item }) => {
		return (
			<PlaceButton onPress={() => Linking.openURL(item.instagram)}>
				<Icon name="logo-instagram" size={30} color="#363535" />
				<PlaceName>{item.name}</PlaceName>
			</PlaceButton>
		);
	}, []);

	return (
		<Container>
			<Header />

			{loading && <Loading />}

			<Content>
				<Title>Lugares para adoção</Title>

				<FlatList
					data={places}
					renderItem={renderItem}
					ListFooterComponent={places.length > 5 ? <Padding /> : null}
					contentContainerStyle={styles.ListContent}
				/>
			</Content>
		</Container>
	);
};

export default PlacesList;
