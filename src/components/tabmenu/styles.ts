import styled from 'styled-components/native';

export const Container = styled.View`
	position: absolute;
	bottom: 40px;
	width: 100%;
	align-items: center;
`;

export const Content = styled.View`
	background-color: #05d5ba;
	flex-direction: row;
	justify-content: space-around;
	border-radius: 15px;
	padding: 5px 15px;

	opacity: 0.95;
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
