import React from 'react';
import { View } from 'react-native';

interface Props {
	size?: number;
}

const padding: React.FC<Props> = ({ size = 200 }: Props) => {
	return <View style={{ marginTop: size }} />;
};

export default padding;
