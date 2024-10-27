import styled, { css } from 'styled-components/native';

interface ContentProps {
	isInGame?: boolean;
}

export const Container = styled.View<ContentProps>`
	position: absolute;
	bottom: 40px;
	width: 100%;
	align-items: center;

	${props =>
		props.isInGame &&
		css`
			bottom: 0px;
		`}
`;

export const Content = styled.View<ContentProps>`
	background-color: #f8cdb9;
	flex-direction: row;
	justify-content: space-around;
	border-radius: 15px;
	padding: 5px 15px;

	opacity: 0.9;

	${props =>
		props.isInGame &&
		css`
			opacity: 1;
			height: 90px;
		`}
`;

export const Button = styled.TouchableOpacity`
	width: 80px;
	justify-content: center;
	align-items: center;
`;

interface IconProps {
	isSelected?: boolean;
}

export const Icon = styled.Image.attrs<IconProps>(({ isSelected }) => ({
	tintColor: isSelected ? '#fff' : '#000',
}))`
	width: 40px;
	height: 40px;
	margin: 13px;
`;
