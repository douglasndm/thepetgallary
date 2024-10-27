import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Button, Icon } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
	currentView: ICurrentView;
	onPress: (value: ICurrentView) => void;
}

const tabmenu: React.FC<Props> = ({ currentView, onPress }: Props) => {
	const { navigate } = useNavigation<NativeStackNavigationProp<AppRoutes>>();

	const navigateDog = useCallback(() => {
		onPress('Dog');

		navigate('Home', {});
	}, [navigate, onPress]);

	const navigateCat = useCallback(() => {
		onPress('Cat');

		navigate('Home', {});
	}, [navigate, onPress]);

	const navigatePlaces = useCallback(() => {
		onPress('Places');

		navigate('PlacesList', {});
	}, [navigate, onPress]);

	const navigateMenu = useCallback(() => {
		onPress('Menu');

		navigate('Menu', {});
	}, [navigate, onPress]);

	const navigateGame = useCallback(() => {
		onPress('Game');

		navigate('Unity', {});
	}, [navigate, onPress]);

	return (
		<Container isInGame={currentView === 'Game'}>
			<Content isInGame={currentView === 'Game'}>
				<Button onPress={navigateDog}>
					<Icon
						source={require('@assets/images/dog-head.png')}
						isSelected={currentView === 'Dog'}
					/>
				</Button>
				<Button onPress={navigateCat}>
					<Icon
						source={require('@assets/images/cat-head.png')}
						isSelected={currentView === 'Cat'}
					/>
				</Button>

				<Button onPress={navigatePlaces}>
					<Icon
						source={require('@assets/images/pets-hospital.png')}
						isSelected={currentView === 'Places'}
					/>
				</Button>

				<Button onPress={navigateMenu}>
					<Icon
						source={require('@assets/images/navigation-menu-1.png')}
						isSelected={currentView === 'Menu'}
					/>
				</Button>

				<Button onPress={navigateGame}>
					<Icon
						source={require('@assets/images/video-game-xbox-controller.png')}
						isSelected={currentView === 'Game'}
					/>
				</Button>
			</Content>
		</Container>
	);
};

export default tabmenu;
