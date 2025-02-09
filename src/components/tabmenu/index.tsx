import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container, Content, Button, Icon } from './styles';

interface Props {
	currentView: ICurrentView;
	onPress: (value: ICurrentView) => void;
}

const tabmenu: React.FC<Props> = ({ currentView, onPress }: Props) => {
	const { navigate } = useNavigation<NativeStackNavigationProp<AppRoutes>>();

	const insets = useSafeAreaInsets();

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

	return (
		<Container>
			<Content style={{ paddingBottom: Math.max(insets.bottom, 25) }}>
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
			</Content>
		</Container>
	);
};

export default tabmenu;
