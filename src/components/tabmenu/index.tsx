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

	return (
		<Container>
			<Content>
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
			</Content>
		</Container>
	);
};

export default tabmenu;
