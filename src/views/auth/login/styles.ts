import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background-color: #e8e8ea;
`;

export const PageContent = styled.View`
	padding: 0 20px;
`;

export const TextTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: #000;
	text-align: center;
	margin-bottom: 20px;
`;

export const TextDescription = styled.Text`
	color: #000;
	font-size: 16px;
	margin-bottom: 20px;
`;

export const LoginContainer = styled.View`
	align-items: center;
`;

export const LoginButton = styled.TouchableOpacity``;

export const Loading = styled.ActivityIndicator.attrs(() => ({
	size: 'large',
	color: '#f8cdb9',
}))``;
