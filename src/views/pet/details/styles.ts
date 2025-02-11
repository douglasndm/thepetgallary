import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Ionicons from '@react-native-vector-icons/ionicons';

export const Container = styled.ScrollView.attrs(() => ({
	contentInsetAdjustmentBehavior: 'automatic',
	alwaysBounceVertical: true,
	contentContainerStyle: {
		flexGrow: 1,
	},
}))`
	background-color: #e8e8ea;
`;

export const Content = styled(Surface).attrs(() => ({
	elevation: 4,
}))`
	margin: 20px 10px;
	background-color: #ffffff;
	border-radius: 12px;
	padding: 15px;
`;

export const Icon = styled(MaterialDesignIcons).attrs(() => ({
	size: 80,
}))`
	align-self: center;
`;

export const Name = styled.Text`
	font-size: 22px;
	font-weight: bold;
	color: #000;
`;

export const Species = styled.Text`
	font-size: 16px;
	color: #000;
`;

export const Breed = styled.Text`
	font-size: 16px;
	color: #000;
`;

export const BirthDate = styled.Text`
	font-size: 16px;
	color: #000;
`;

export const Weight = styled.Text`
	font-size: 16px;
	color: #000;
`;

export const HealthNotes = styled.Text`
	font-size: 16px;
	color: #000;
`;

export const ActionButtonContainer = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	align-self: flex-end;
	margin-right: 25px;
	margin-bottom: 10px;
`;

export const ActionButtonIcon = styled(Ionicons).attrs(() => ({
	size: 24,
}))`
	margin-right: 5px;
`;

export const ActionButtonText = styled.Text`
	font-size: 16px;
	font-weight: bold;
	color: #000000;
`;
