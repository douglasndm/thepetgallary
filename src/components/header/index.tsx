import React from 'react';

import { Container, TextContainer, AppTitle, PageTitle } from './styles';

interface Props {
    currentPageTitle: string;
}

const header: React.FC<Props> = ({ currentPageTitle } : Props) => {
    return (
        <Container>
            <TextContainer>
                <AppTitle>The Pet Gallery</AppTitle>
                <PageTitle>{currentPageTitle}</PageTitle>
            </TextContainer>
        </Container>
    );
};

export default header;
