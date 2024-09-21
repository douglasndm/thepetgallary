import React from 'react';

import { Container, Content, Button, Icon } from './styles';

const tabmenu: React.FC = () => {
    return (
        <Container>
            <Content>
                <Button>
                    <Icon source={require('../../../assets/images/dog-head.png')} />
                </Button>
                <Button>
                    <Icon source={require('../../../assets/images/cat-head.png')} />
                </Button>
                <Button>
                    <Icon source={require('../../../assets/images/navigation-menu-1.png')} />
                </Button>
            </Content>
        </Container>
);
};

export default tabmenu;
