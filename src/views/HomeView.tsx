import { Image, Box, Center, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BackendStatus from '../components/ServerStatus';

const HomeView = () => {
	const navigate = useNavigate();
	const handleStatistics = () => {
		navigate('/statistics');
	};
	const handleUserOverview = () => {
		navigate('/user-overview');
	};

	return (
		<Box backgroundSize="cover" h="calc(100vh)">
			<Center>
				<Box marginTop={'5%'}>
					<BackendStatus/>
				</Box>
			</Center>
			<Center>
				<Image marginTop={'3%'} height={'calc(20vh)'} src="pictures/getOutBackOfficeLogo.png" />
			</Center>
			<Center>
				<Button marginTop={'5%'} backgroundColor={'#d85444'} colorScheme="red" size="lg" onClick={handleStatistics}>
					Statistiques
				</Button>
			</Center>
			<Center>
				<Button marginTop={'1%'} backgroundColor={'#d85444'} colorScheme="red" size="lg" onClick={handleUserOverview}>
					Gestion des utilisateurs
				</Button>
			</Center>
		</Box>
	);
};

export default HomeView;
