import React from 'react';
import { ButtonProps } from 'react-native';

import { Container, Text } from './styles';

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
	return (
		<Container {...props}>
			<Text>{props.title}</Text>
		</Container>
	);
};

export default Button;
