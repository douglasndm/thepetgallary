import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { fetchPictures } from '@services/api';

import currentViewContext from '@contexts/currentView';

import Header from '@components/header';
import PhotosList from '@components/listanimals';
import PlacesList from '@components/listplaces';

import {
	Container,
	PageContent,
	PhotosContainer,
	PhotosTitleContainer,
	PhotosTitle,
} from './styles';

const Home: React.FC = () => {
	const viewContext = useContext(currentViewContext);

	const [images, setImages] = useState<APIItem[]>([]);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	// Ref para manter o valor de `loading` estável entre renderizações
	const loadingRef = useRef(loading);

	// Atualiza o valor de loadingRef sempre que o estado `loading` mudar
	useEffect(() => {
		loadingRef.current = loading;
	}, [loading]);

	const loadData = useCallback(async () => {
		if (loadingRef.current || !hasMore) {
			return;
		}

		setLoading(true);
		try {
			const type = viewContext?.currentView === 'Cat' ? 'cat' : 'dog';

			const response = await fetchPictures({ type, page });

			if (response.length > 0) {
				setImages(prevData => [...prevData, ...response]);
			} else {
				setHasMore(false);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [hasMore, page, viewContext?.currentView]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	// Novo useEffect para detectar mudança em `currentView`
	useEffect(() => {
		// Função que será chamada quando o `currentView` mudar
		const handleViewChange = () => {
			setPage(0);
			setImages([]);
			setHasMore(true); // Reseta para poder carregar mais
			loadData(); // Carrega dados para a nova visualização
		};

		handleViewChange(); // Chama a função ao detectar mudança
	}, [viewContext?.currentView]); // Coloca `currentView` como dependência para que o efeito seja chamado sempre que mudar

	const ListHeader = useCallback(() => {
		return (
			<>
				<Header currentPageTitle={viewContext?.currentView} />

				<PhotosTitleContainer>
					<PhotosTitle>{viewContext?.currentView} photos</PhotosTitle>
				</PhotosTitleContainer>
			</>
		);
	}, [viewContext?.currentView]);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { layoutMeasurement, contentOffset, contentSize } =
			event.nativeEvent;

		const threshold = 0.75; // Percentual da tela antes de carregar mais
		const position = contentOffset.y + layoutMeasurement.height;
		const shouldFetchMore = position >= contentSize.height * threshold;

		if (shouldFetchMore && !loading) {
			setPage(prevPage => prevPage + 1); // Carrega a próxima página
		}
	};

	return (
		<Container>
			<PageContent>
				{(viewContext?.currentView === `Cat` ||
					viewContext?.currentView === `Dog`) && (
					<PhotosContainer>
						<PhotosList
							currentView={viewContext.currentView}
							ListHeaderComponent={ListHeader}
							onScroll={handleScroll}
							images={images}
						/>
					</PhotosContainer>
				)}

				{viewContext?.currentView === 'Places' && <PlacesList />}
			</PageContent>
		</Container>
	);
};

export default Home;
