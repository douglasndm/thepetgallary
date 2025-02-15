import styled, { css } from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';
import { Surface } from 'react-native-paper';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

export const Container = styled(Surface).attrs(() => ({
	elevation: 2,
}))`
	position: absolute;
	bottom: 0;
	width: 100%;
	align-items: center;
`;

export const Content = styled.View`
	background-color: #f8cdb9;
	flex-direction: row;
	justify-content: space-around;
	padding: 5px 15px 25px 15px;
	width: 100%;
`;

export const Button = styled.TouchableOpacity`
	width: ${(Dimensions.get('window').width - 50) / 5}px;
	justify-content: center;
	align-items: center;

	${Platform.OS === 'ios' &&
	css`
		height: 40px;
		margin: 13px 0;
	`}
`;
// this is used because ios does not have icon exported below
// it use sfsymbol instead, so button show have the height

interface IconProps {
	isSelected?: boolean;
}

export const Icon = styled.Image.attrs<IconProps>(({ isSelected }) => ({
	tintColor: isSelected ? '#ffffff' : '#000',
}))`
	width: 40px;
	height: 40px;
	margin: 13px;
`;

export const MaterialIcons = styled(MaterialDesignIcons).attrs<IconProps>(
	({ isSelected }) => ({
		color: isSelected ? '#ffffff' : '#000',
		size: 35,
	})
)``;
