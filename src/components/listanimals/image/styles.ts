import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';

export const lottieStyle = StyleSheet.create({
	lottie: {
		width: Dimensions.get('window').width,
		height: 500,
		position: 'absolute',
		backgroundColor: '#f8cdb9',
	},
});

export const PhotoContainer = styled.TouchableOpacity``;
