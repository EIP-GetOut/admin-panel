import { Image, Box, Center, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BackendStatus from '../components/ServerStatus';
import { BackendStatusInterface } from '../conf/backendStatus'
import { CSSProperties, FC } from 'react'
import handleNews from './NewsView';

const paginationButtonDisabledStyle: CSSProperties = {
  padding: '10px 20px',
  margin: '0 10px',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  backgroundColor: '#d3d3d3',
  cursor: 'not-allowed'
};

type Props = {
	backendStatus: BackendStatusInterface
}

const HomeView: FC<Props> = ({backendStatus}) => {
	const navigate = useNavigate();
	const backIsUp: boolean = backendStatus.status === 'Running'
	const handleStatistics = () => {
		navigate('/statistics');
	};
	const handleUserOverview = () => {
		navigate('/user-overview');
	};

	return (
  <Box backgroundSize={'cover'} h={'calc(100vh)'}>
    <Center>
      <Box marginTop={'5%'}>
        <BackendStatus backendStatus={backendStatus}/>
      </Box>
    </Center>
    <Center>
      <Image marginTop={'3%'} height={'calc(20vh)'} src={'pictures/getOutBackOfficeLogo.png'} />
    </Center>
    <Center marginTop={'5%'}>
      {backIsUp ?
      (
        <Button backgroundColor={'#d85444'} colorScheme={'red'} size={'lg'} onClick={handleStatistics}>
          Statistiques
        </Button>
      )
        : <button style={paginationButtonDisabledStyle}>Statistiques</button>
      }
    </Center>
    <Center marginTop={'1%'}>
      {backIsUp ?
        (
          <Button backgroundColor={'#d85444'} colorScheme={'red'} size={'lg'} onClick={handleUserOverview}>
            Gestion des utilisateurs
          </Button>
        )
        : <button style={paginationButtonDisabledStyle}>Gestion des utilisateurs</button>
      }
    </Center>
    <Center marginTop={'1%'}>
      {backIsUp ?
      (
        <Button backgroundColor={'#d85444'} colorScheme={'red'} size={'lg'} onClick={handleNews}>
          Gestion des articles
        </Button>
      )
        : <button style={paginationButtonDisabledStyle}>Gestion des articles</button>
      }
    </Center>
  </Box>
	);
};

export default HomeView;
