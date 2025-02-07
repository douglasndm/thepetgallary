import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs(() => ({
	contentInsetAdjustmentBehavior: 'automatic',
	alwaysBounceVertical: true,
	contentContainerStyle: {
		flexGrow: 1,
	},
}))`
	background-color: #fff;
	flex: 1;
`;

export const Title = styled.Text`
	margin: 0px 5px 15px;
	font-size: 16px;
`;

export const Content = styled.View`
	margin: 20px;
	background-color: #f8cdb9;
	padding: 20px;
	border-radius: 20px;
`;

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
