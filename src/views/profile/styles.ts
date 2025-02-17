import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';

export const Container = styled.View`
	flex: 1;
`;

export const Content = styled(Surface).attrs(() => ({
	elevation: 2,
}))`
	padding: 15px 20px;
	margin: 0 15px;
	border-radius: 12px;
	background-color: #ffff;
`;

export const Name = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: #000;
`;

export const Email = styled.Text`
	font-size: 16px;
	color: rgb(85, 85, 85);

	margin-bottom: 20px;
`;
