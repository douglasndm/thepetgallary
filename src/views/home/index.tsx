import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { fetchPictures} from '@services/api';

import Header from '@components/header';
import PhotosList from '@components/listanimals';

import { Container, PageContent, PhotosContainer, PhotosTitleContainer, PhotosTitle } from './styles';

interface Props {
    currentView: 'Cat' | 'Dog' | 'Menu';
}

const home: React.FC<Props> = ({ currentView } : Props) => {
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
        if (loadingRef.current || !hasMore) { return; }

        setLoading(true);
        try {
            const type = currentView === 'Cat' ? 'cat' : 'dog';

            const response = await fetchPictures({ type, page });

            if (response.length > 0) {
                setImages((prevData) => [...prevData, ...response]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [currentView, hasMore, page]);

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

    }, [currentView]); // Coloca `currentView` como dependência para que o efeito seja chamado sempre que mudar

    const ListHeader = useCallback(() => {
        return (
        <>
            <Header currentPageTitle={currentView} />

            <PhotosTitleContainer>
                <PhotosTitle>Cuties {currentView} photos</PhotosTitle>
            </PhotosTitleContainer>
        </>
        );
    }, [currentView]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        const threshold = 0.75; // Percentual da tela antes de carregar mais
        const position = contentOffset.y + layoutMeasurement.height;
        const shouldFetchMore = position >= contentSize.height * threshold;

        if (shouldFetchMore && !loading) {
            setPage((prevPage) => prevPage + 1); // Carrega a próxima página
        }
    };

    return (
        <Container>
            <PageContent>
                <PhotosContainer>
                <PhotosList
                    ListHeaderComponent={ListHeader}
                    onScroll={handleScroll}
                    images={images} />
                </PhotosContainer>
            </PageContent>
        </Container>
    );
};

export default home;
