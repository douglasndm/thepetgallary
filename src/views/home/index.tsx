import React from 'react';

import Padding from '@components/padding';

import { Container, PageContent, PhotosContainer, PhotosTitleContainer, PhotosTitle, PhotosList, Photo } from './styles';

const home: React.FC = () => {
  const photos: NodeRequire[] = [];

  for (let i = 0; i < 20; i++) {
    photos.push(require('@assets/images/FB_IMG_1489097250499.jpg'));
  }
  return (
    <Container>
      <PageContent>
        <PhotosContainer>
          <PhotosTitleContainer>
            <PhotosTitle>Cuties photos</PhotosTitle>
          </PhotosTitleContainer>
          <PhotosList
            data={photos}
            numColumns={2}
            renderItem={({ item }) => <Photo source={item} />}
            ListFooterComponent={<Padding />}
          />
        </PhotosContainer>
      </PageContent>
    </Container>);
};

export default home;
