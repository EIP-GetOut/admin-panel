import { Text, Box, Center, Button, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JSON from 'json5';
import { SignInRequestService } from '../services/SignServices';

async function fetchData() {
	try {
	  const response = await fetch('http://localhost:8080/accounts/1');
	  const result = await response.json()
	  console.log(result.accounts.accountCreatedLastWeek)
	  return parseInt(result.accounts.accountCreatedLastWeek)
	} catch (error) {
	  // Gérer les erreurs
	  console.error('Erreur lors de la requête :', error);
	}
	return 0
  }

const TestService = async (): Promise<string> => {
	const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
	const result = await response.json();
	return result.bpi.EUR.rate;
};

interface RectangleAccountCreated {
	number: any;
}

interface RectangleRecommendationGenerated {
	number: number;
  }


  interface BarChartProps {
	lastWeekCount: number;
	thisWeekCount: number;
  }
const BarChart: React.FC<BarChartProps> = ({ lastWeekCount, thisWeekCount }) => {
const maxCount = Math.max(lastWeekCount, thisWeekCount);
	const calculateHeight = (count: number): string => {
	  const maxHeight = 200; // Hauteur maximale des barres
	  const ratio = (count / maxCount) * 100; // Calculer le ratio en pourcentage
	  const height = (ratio / 100) * maxHeight; // Calculer la hauteur en pixels
	  return `${height}px`;
	};

	return (
	  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', height: '300px', border: '1px solid #000', padding: '20px', marginLeft : "750px", marginRight : "750px", }}>
		<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
        <div>Last week</div>
        <div>This week</div>
      </div>
		<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
		  <div style={{ width: '50px', backgroundColor: '#007bff', textAlign: 'center', color: '#fff', fontSize: '14px', height: calculateHeight(lastWeekCount), transition: 'height 0.5s ease', marginBottom : '10px', marginTop : '10px' }}>
			{lastWeekCount}
		  </div>
		  <div style={{ width: '50px', backgroundColor: '#007bff', textAlign: 'center', color: '#fff', fontSize: '14px', height: calculateHeight(thisWeekCount), transition: 'height 0.5s ease', marginBottom : '10px', marginTop : '10px' }}>
			{thisWeekCount}
		  </div>
		</div>
	  </div>
	);
  };

const RectangleAG: React.FC<RectangleRecommendationGenerated> = ({ number }) => {
	return (
	  <div style={{ border: '1px solid black', marginLeft : "600px", marginRight : "600px", borderLeft: '1px solid black', borderRight: '1px solid black', padding: '1px', textAlign: 'center' }}>
		<div style={{ marginBottom: '10px' }}>Nombre de comptes créés cette semaine</div>
		<div style={{ fontSize: '24px', fontWeight: 'bold' }}>{number}</div>
	  </div>
	);
  };

const RectangleRG: React.FC<RectangleRecommendationGenerated> = ({ number }) => {
	return (
	  <div style={{ border: '1px solid black', marginLeft : "600px", marginRight : "600px", borderLeft: '1px solid black', borderRight: '1px solid black', padding: '1px', textAlign: 'center' }}>
		<div style={{ marginBottom: '10px' }}>Nombre de recommendations générées</div>
		<div style={{ fontSize: '24px', fontWeight: 'bold' }}>{number}</div>
	  </div>
	);
  };

const PlaygroundView = () => {
	const navigate = useNavigate();

	const [toggle, settoggle] = useState('PLACEHOLDER');

	const handleButton = () => {
		if (toggle === 'PLACEHOLDER') settoggle('HELLO WORLD');
		else settoggle('PLACEHOLDER');
	};

	const handleMenu = () => {
		navigate('/');
	};

	const [bitcoinValue, setBitcoinValue] = useState('PLACEHOLDER');

	const getBitcoinValue = () => {
		console.log('setting bitcoin value');
		TestService().then((response) => {
			setBitcoinValue(response);
		});
	};

	const [textinputuser, setTextInputuser] = useState('PLACEHOLDER');
	const [textinputpassword, setTextInputpassword] = useState('PLACEHOLDER');
	const [response, setResponse] = useState('Not logged in');
	const [nbAccounts, setNbAccounts] = useState(NaN);

	const handleSignIn = () => {
		console.log('test');
		setResponse('Logging in...');
		SignInRequestService({ username: textinputuser, password: textinputpassword })
			.then((response) => {
				setResponse(JSON.parse(response).message);
			})
			.catch((error) => {
				console.error(error);
				setResponse('Error');
			});
		console.log(response);
	};

	useEffect(() => {
		fetchData().then((nbAccounts) => {
			setNbAccounts(nbAccounts)
		})
	}, [])
	if (Number.isNaN(nbAccounts)) {
		return (<p>Loading...</p>)
	}
	return (
		<Box bgImage="pictures/background.png" backgroundSize="cover" h="calc(100vh)">
			<Center>
				<Text>Playground</Text>
			</Center>
			<Button colorScheme="blue" size="lg" onClick={handleButton}>
				Button
			</Button>
			<Text>{toggle}</Text>
			<Button colorScheme="blue" size="lg" onClick={getBitcoinValue}>
				Get Bitcoin Value
			</Button>
			<Text>{bitcoinValue}</Text>
			<Button colorScheme="blue" size="lg" onClick={handleMenu}>
				Menu
			</Button>
			<Center>
				<Input placeholder="Username" onChange={(e) => setTextInputuser(e.target.value)} />
			</Center>
			<Center>
				<Input placeholder="Password" onChange={(e) => setTextInputpassword(e.target.value)} type="text" />
			</Center>
			<Center>
				<Button colorScheme="blue" size="lg" onClick={handleSignIn}>
					Test
				</Button>
			</Center>
			<Center>
				<Text>{response}</Text>
			</Center>
			<div>
      			<RectangleAG number={nbAccounts} />
    		</div>
			<div style={{ margin: '25px' }} />
			<div>
				<BarChart lastWeekCount={10} thisWeekCount={nbAccounts}></BarChart>
			</div>
    		<div style={{ margin: '25px' }} />
			<div>
      			<RectangleRG number={476} />
    		</div>
		</Box>
	);
};

export default PlaygroundView;
