import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

export const Container = styled.View`
	position: absolute;
	bottom: 0;
	width: 100%;
	align-items: center;
`;

export const Content = styled.View`
	background-color: #ffffff;
	flex-direction: row;
	justify-content: space-around;
	padding: 5px 15px 25px 15px;
	width: 100%;
`;

export const Button = styled.TouchableOpacity`
	width: ${(Dimensions.get('window').width - 50) / 5}px;
	justify-content: center;
	align-items: center;
`;

interface IconProps {
	isSelected?: boolean;
}

export const Icon = styled.Image.attrs<IconProps>(({ isSelected }) => ({
	tintColor: isSelected ? '#5A2FFF' : '#000',
}))`
	width: 40px;
	height: 40px;
	margin: 13px;
`;

export const IoniconsIcon = styled(Ionicons).attrs(() => ({
	size: 36,
}))``;
