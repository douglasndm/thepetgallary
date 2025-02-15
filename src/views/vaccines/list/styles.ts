import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';

export const Container = styled.ScrollView.attrs(() => ({
	contentInsetAdjustmentBehavior: 'automatic',
	alwaysBounceVertical: true,
	contentContainerStyle: {
		flexGrow: 1,
	},
}))`
	background-color: #e8e8ea;
`;

export const VaccineContainer = styled(Surface).attrs(() => ({
	elevation: 4,
}))`
	background-color: #ffffff;

	margin: 5px 20px 0;
	border-radius: 12px;
	padding: 15px;
`;

export const VaccineContent = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const TextContainer = styled.View``;

export const VaccineName = styled.Text`
	font-weight: bold;
	font-size: 16px;
	color: #000;
`;

export const VaccineDate = styled.Text`
	color: rgb(134, 134, 134);
`;
