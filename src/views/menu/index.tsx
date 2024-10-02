import React from 'react';
import { Linking } from 'react-native';
import LottieView from 'lottie-react-native';

import dogDancing from '@animations/dog_dancing.lottie';

import Header from '@components/header';
import Padding from '@components/padding';

import {
	Container,
	Content,
	Title,
	AppName,
	Info,
	AttibuitionContainer,
	Attibution,
	AttibutionLink,
} from './styles';

const Menu: React.FC = () => {
	return (
		<Container>
			<Header />
			<Title>Sobre</Title>
			<Content>
				<AppName>The Pet Gallery</AppName>
				<Info>Sua dose diária de lambeijo</Info>

				<Info>Desenvolvido por Douglas Nunes de Mattos</Info>

				<LottieView
					source={dogDancing}
					style={{
						width: 250,
						height: 250,
						marginTop: 30,
						alignSelf: 'center',
					}}
					autoPlay
					loop
				/>

				<AttibuitionContainer>
					<Attibution>
						Mais aplicativos{' '}
						<AttibutionLink
							onPress={() =>
								Linking.openURL('https://douglasndm.dev')
							}
						>
							aqui
						</AttibutionLink>
					</Attibution>
				</AttibuitionContainer>

				<AttibuitionContainer>
					<Attibution>
						Logo de pikisuperstar no{' '}
						<AttibutionLink
							onPress={() =>
								Linking.openURL(
									'https://br.freepik.com/vetores-gratis/pessoas-de-ilustracao-plana-com-animais-de-estimacao_15292679.htm'
								)
							}
						>
							Freepik
						</AttibutionLink>
					</Attibution>
				</AttibuitionContainer>

				<AttibuitionContainer>
					<Attibution>
						Animação de carregamento de doguinhos de Syed Asim Ali
						Shah no{' '}
						<AttibutionLink
							onPress={() =>
								Linking.openURL(
									'https://lottiefiles.com/free-animation/dog-walking-7K4JCxjvHm'
								)
							}
						>
							LottieFiles
						</AttibutionLink>
					</Attibution>
				</AttibuitionContainer>

				<AttibuitionContainer>
					<Attibution>
						Animação de carregamento de gatinhos de Evgeny Marinin
						no{' '}
						<AttibutionLink
							onPress={() =>
								Linking.openURL(
									'https://lottiefiles.com/free-animation/cat-loader-F4ZybShCAh'
								)
							}
						>
							LottieFiles
						</AttibutionLink>
					</Attibution>
				</AttibuitionContainer>

				<AttibuitionContainer>
					<Attibution>
						Animação do Header por Diane Picchiottino no{' '}
						<AttibutionLink
							onPress={() =>
								Linking.openURL(
									'https://lottiefiles.com/free-animation/loader-cat-dWUie0iIVk'
								)
							}
						>
							LottieFiles
						</AttibutionLink>
					</Attibution>
				</AttibuitionContainer>

				<AttibuitionContainer>
					<Attibution>
						Animação no sobre por Eugene Croquette no{' '}
						<AttibutionLink
							onPress={() =>
								Linking.openURL(
									'https://lottiefiles.com/free-animation/dancing-dog-2x20-cSm026rhBF'
								)
							}
						>
							LottieFiles
						</AttibutionLink>
					</Attibution>
				</AttibuitionContainer>

				<AttibuitionContainer>
					<Attibution>
						Animação de falta de conexão de Hishara Dilshan HishD no{' '}
						<AttibutionLink
							onPress={() =>
								Linking.openURL(
									'https://lottiefiles.com/free-animation/no-connection-zD7pwxybpR'
								)
							}
						>
							LottieFiles
						</AttibutionLink>
					</Attibution>
				</AttibuitionContainer>
			</Content>
			<Padding />
		</Container>
	);
};

export default Menu;
