import { Image, Box, Center, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
	const navigate = useNavigate();
	const handleLogin = () => {
		navigate('/login');
	};
	const handlePlayground = () => {
		navigate('/playground');
	};

	return (
		<Box bgImage="pictures/background.png" backgroundSize="cover" h="calc(100vh)">
			<Center>
				<Image marginTop={312} height={'calc(20vh)'} src="pictures/getOutBackOfficeLogo.png" />
			</Center>
			<Center>
				<Button marginTop={40} colorScheme="blue" size="lg" onClick={handleLogin}>
					Log in
				</Button>
			</Center>
			<Center>
				<Button bottom={'calc(-25vh)'}colorScheme="blue" size="lg" onClick={handlePlayground}>
					Playground
				</Button>
			</Center>
		</Box>
	);
};

export default HomeView;
