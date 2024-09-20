import React from 'react';

import { Container, Content, Button, Text } from './styles';

const tabmenu: React.FC = () => {
    return (
        <Container>
            <Content>
                <Button>
                    <Text>Dogs</Text>
                </Button>
                <Button>
                    <Text>Cats</Text>
                </Button>
                <Button>
                    <Text>Ducks</Text>
                </Button>
                <Button>
                    <Text>More</Text>
                </Button>
            </Content>
        </Container>
);
};

export default tabmenu;
