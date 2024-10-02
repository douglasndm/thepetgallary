import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
	ListContent: {
		margin: 20,
		backgroundColor: '#f8cdb9',
		padding: 20,
		borderRadius: 20,
	},
});
export const Container = styled.View`
	background-color: #fff;
	flex: 1;
`;

export const Title = styled.Text`
	margin: 0 25px;
	font-size: 16px;
`;

export const Content = styled.View``;

export const PlaceButton = styled.TouchableOpacity`
	margin-bottom: 15px;
	padding: 15px;
	border-radius: 12px;

	flex-direction: row;
	align-items: center;

	background-color: #fff;
	opacity: 0.85;
`;

export const PlaceName = styled.Text`
	color: #363535;
	margin-left: 10px;
	font-weight: bold;
`;
