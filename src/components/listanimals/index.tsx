import React, { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import Padding from '@components/padding';

import { PhotosList, Photo } from './styles';

interface Props {
    images: APIItem[];
    ListHeaderComponent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ComponentType<any> | null | undefined;
    onScroll?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined;
}

const listanimals: React.FC<Props> = ({ images, ListHeaderComponent, onScroll }: Props) => {

    const renderItem = useCallback(({ item }: { item: APIItem }) => {
        return <Photo source={{
            uri: item.url,
        }} />;
    }, []);

    return (
        <PhotosList
            data={images}
            ListHeaderComponent={ListHeaderComponent}
            numColumns={2}
            renderItem={renderItem}
            onScroll={onScroll}
            ListFooterComponent={<Padding />}
        />
    );
};

export default listanimals;
