import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth } from '@react-native-firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SFSymbol } from 'react-native-sfsymbols';

import { Container, Content, Button, Icon, MaterialIcons } from './styles';

interface Props {
	currentRoute: string | undefined;
}

const TabMenu: React.FC<Props> = (props: Props) => {
	const { navigate } = useNavigation<NativeStackNavigationProp<AppRoutes>>();

	const insets = useSafeAreaInsets();

	const navigateDog = useCallback(() => {
		navigate('DogsView', {});
	}, [navigate]);

	const navigateCat = useCallback(() => {
		navigate('CatsView', {});
	}, [navigate]);

	const navigatePlaces = useCallback(() => {
		navigate('PlacesList', {});
	}, [navigate]);

	const navigatePetList = useCallback(() => {
		navigate('PetList', {});
	}, [navigate]);

	const navigateMenu = useCallback(() => {
		navigate('Menu', {});
	}, [navigate]);

	return (
		<Container>
			<Content style={{ paddingBottom: Math.max(insets.bottom, 25) }}>
				<Button onPress={navigateDog}>
					<SFSymbol
						name={
							props.currentRoute === 'DogsView'
								? 'dog.fill'
								: 'dog'
						}
						scale="large"
						color={
							props.currentRoute === 'DogsView'
								? '#FFFFFF'
								: 'black'
						}
						size={30}
					/>
				</Button>

				<Button onPress={navigateCat}>
					<SFSymbol
						name={
							props.currentRoute === 'CatsView'
								? 'cat.fill'
								: 'cat'
						}
						scale="large"
						color={
							props.currentRoute === 'CatsView'
								? '#FFFFFF'
								: 'black'
						}
						size={30}
					/>
				</Button>

				<Button onPress={navigatePlaces}>
					<SFSymbol
						name={
							props.currentRoute === 'PlacesList'
								? 'pawprint.fill'
								: 'pawprint'
						}
						scale="large"
						color={
							props.currentRoute === 'PlacesList'
								? '#FFFFFF'
								: 'black'
						}
						size={30}
					/>
				</Button>

				{getAuth().currentUser && (
					<Button onPress={navigatePetList}>
						<SFSymbol
							name={
								props.currentRoute === 'PetList'
									? 'heart.text.clipboard.fill'
									: 'heart.text.clipboard'
							}
							scale="large"
							color={
								props.currentRoute === 'PetList'
									? '#FFFFFF'
									: 'black'
							}
							size={30}
						/>
					</Button>
				)}

				<Button onPress={navigateMenu}>
					<SFSymbol
						name={
							props.currentRoute === 'Menu'
								? 'info.circle.fill'
								: 'info.circle'
						}
						scale="large"
						color={
							props.currentRoute === 'Menu' ? '#FFFFFF' : 'black'
						}
						size={30}
					/>
				</Button>
			</Content>
		</Container>
	);
};

export default TabMenu;
