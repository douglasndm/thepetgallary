import styled from 'styled-components/native';

export const Container = styled.View`
	width: 100%;
	height: 100%;
	background-color: #000;

	justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
	align-self: flex-end;

	margin-right: 10px;
	margin-top: 35px;

	padding: 15px;
`;

export const ButtonText = styled.Text`
	color: #fff;
	font-size: 24px;
`;

export const Image = styled.Image.attrs(() => ({
	resizeMode: 'contain',
}))`
	width: 100%;
	flex: 1;
`;
