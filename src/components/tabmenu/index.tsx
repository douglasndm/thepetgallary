import React from 'react';

import { Container, Content, Button, Icon } from './styles';

interface Props {
    currentView: 'Dog' | 'Cat' | 'Menu';
    onPress: (value: 'Dog' | 'Cat' | 'Menu') => void
}

const tabmenu: React.FC<Props> = ({ currentView, onPress }: Props) => {
    return (
        <Container>
            <Content>
                <Button onPress={() => onPress('Dog')}>
                    <Icon source={require('@assets/images/dog-head.png')} isSelected={currentView === 'Dog'} />
                </Button>
                <Button onPress={() => onPress('Cat')}>
                    <Icon source={require('@assets/images/cat-head.png')} isSelected={currentView === 'Cat'} />
                </Button>
                {/*}
                <Button onPress={() => onPress('Menu')}>
                    <Icon source={require('@assets/images/navigation-menu-1.png')} />
                </Button>
                */}
            </Content>
        </Container>
);
};

export default tabmenu;
