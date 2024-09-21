import React from 'react';

import { Container, Content, Button, Icon, Text } from './styles';

const tabmenu: React.FC = () => {
    return (
        <Container>
            <Content>
                <Button>
                    <Icon source={require('../../../assets/images/dog-head.png')} />
                    <Text>Dogs</Text>
                </Button>
                <Button>
                    <Icon source={require('../../../assets/images/cat-head.png')} />
                    <Text>Cats</Text>
                </Button>
                <Button>
                    <Icon source={require('../../../assets/images/navigation-menu-1.png')} />
                    <Text>More</Text>
                </Button>
            </Content>
        </Container>
);
};

export default tabmenu;
