import React from 'react';

import Padding from '@components/padding';

import { PhotosList, Photo } from './styles';

interface Props {
    images: NodeRequire[];
    ListHeaderComponent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ComponentType<any> | null | undefined;
}

const listanimals: React.FC<Props> = ({ images, ListHeaderComponent }: Props) => {
  return <PhotosList
            data={images}
            ListHeaderComponent={ListHeaderComponent}
            numColumns={2}
            renderItem={({ item }) => <Photo source={item} />}
            ListFooterComponent={<Padding />}
        />;
};

export default listanimals;
