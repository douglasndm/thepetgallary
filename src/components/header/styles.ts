import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

export const Container = styled.SafeAreaView`
	flex-direction: row;
	align-items: center;
	margin: 15px 10px 0;
	padding: 0 20px;

	${Platform.OS === 'ios' &&
	css`
		margin-top: 0;
	`}
`;

export const Content = styled.Pressable`
	justify-content: center;
	align-items: center;
	flex-direction: row;
	flex: 1;
`;

export const TextContainer = styled.View`
	padding: 20px 0;
`;

export const AppTitle = styled.Text`
	font-size: 18px;
	text-align: center;
	color: #737573;
`;

export const ButtonIcon = styled.TouchableOpacity``;

export const Icon = styled(Ionicons).attrs(() => ({
	size: 30,
}))``;
