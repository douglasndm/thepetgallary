import React from 'react';

import { Container, TextContainer, AppTitle, PageTitle } from './styles';

const header: React.FC = () => {
    return (
        <Container>
            <TextContainer>
                <AppTitle>Lovely Animals</AppTitle>
                <PageTitle>Dog pictures</PageTitle>
            </TextContainer>
        </Container>
    );
};

export default header;
