import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const PageContent = styled.SafeAreaView``;

export const PhotosContainer = styled.View`
    margin: 5px 20px;
    align-items: center;
`;

export const PhotosTitleContainer = styled.View`
    width: 95%;
    margin-bottom: 15px;
`;

export const PhotosTitle = styled.Text`
    color: #000;
    font-size: 19px;
    font-weight: bold;
`;

export const PhotosList = styled.FlatList``;

export const Photo = styled.Image`
    width: 175px;
    height: 175px;

    background-color: pink;
    margin: 10px;
    border-radius: 8px;
`;
