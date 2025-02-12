import React from 'react';

import {
	ActionButtonContainer,
	ActionButtonIcon,
	ActionButtonText,
} from './styles';

interface Props {
	onPress: () => void;
	iconName: string;
	title: string;
}

const ActionButton: React.FC<Props> = (props: Props) => {
	const { onPress, iconName, title } = props;

	return (
		<ActionButtonContainer onPress={onPress}>
			<ActionButtonIcon name={iconName} />
			<ActionButtonText>{title}</ActionButtonText>
		</ActionButtonContainer>
	);
};

export default ActionButton;
