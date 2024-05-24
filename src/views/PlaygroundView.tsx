import { Text, Box, Center, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

async function fetchData(): Promise<number> {
  try {
    const response = await fetch('http://localhost:8080/accounts/1');
    const result = await response.json();
    console.log(result.accounts.accountCreatedLastWeek);
    return parseInt(result.accounts.accountCreatedLastWeek);
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
  }
  return 0;
}

async function fetchNbAccountsRealTime(): Promise<number> {
  try {
    const response = await fetch('http://localhost:8080/sessions')
    const result = await response.json()
    // console.log(`result = ${JSON.stringify(result, null, 2)}`)
    return parseInt(result.nbSessions)
  } catch (error) {
    console.error('oops')
  }
  return 0;
}

interface RectangleRecommendationGenerated {
  number: number;
  text: string;
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', height: '300px', border: '1px solid #000', padding: '20px', marginLeft: '750px', marginRight: '750px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
        <div>Last week</div>
        <div>This week</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: '50px', backgroundColor: '#007bff', textAlign: 'center', color: '#fff', fontSize: '14px', height: calculateHeight(lastWeekCount), transition: 'height 0.5s ease', marginBottom: '10px', marginTop: '10px' }}>
          {lastWeekCount}
        </div>
        <div style={{ width: '50px', backgroundColor: '#007bff', textAlign: 'center', color: '#fff', fontSize: '14px', height: calculateHeight(thisWeekCount), transition: 'height 0.5s ease', marginBottom: '10px', marginTop: '10px' }}>
          {thisWeekCount}
        </div>
      </div>
    </div>
  );
};

const RectangleAG: React.FC<RectangleRecommendationGenerated> = ({ number, text }) => {
  return (
    <div style={{ border: '1px solid black', marginLeft: '600px', marginRight: '600px', borderLeft: '1px solid black', borderRight: '1px solid black', padding: '1px', textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>{text}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{number}</div>
    </div>
  );
};

const RectangleRG: React.FC<RectangleRecommendationGenerated> = ({ number, text }) => {
  return (
    <div style={{ border: '1px solid black', marginLeft: '600px', marginRight: '600px', borderLeft: '1px solid black', borderRight: '1px solid black', padding: '1px', textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>{text}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{number}</div>
    </div>
  );
};

const PlaygroundView = () => {
  const [toggle, settoggle] = useState('PLACEHOLDER');

  const handleButton = () => {
    if (toggle === 'PLACEHOLDER') settoggle('HELLO WORLD');
    else settoggle('PLACEHOLDER');
  };
  const [nbAccounts, setNbAccounts] = useState<number | null>(null);
  const [nbAccountsRealTime, setNbAccountsRealTime] = useState<number | null>(null);

  useEffect(() => {
    fetchData().then((nbAccounts) => {
      setNbAccounts(nbAccounts);
    });
    fetchNbAccountsRealTime().then((nbAccountsRealTime) => {
      setNbAccountsRealTime(nbAccountsRealTime);
    })
  }, []);

  if (nbAccounts === null) {
    return (<p>Loading...</p>);
  }
  if (nbAccountsRealTime === null ) {
    return (<p>Loading...</p>);
  }

  return (
    <Box bgImage="pictures/background.png" backgroundSize="cover" h="calc(100vh)">
      {/* <Center>
        <Text>Playground</Text>
      </Center> */}
      {/* <Button colorScheme="blue" size="lg" onClick={handleButton}>
        Button
      </Button> */}
      <div>
        <RectangleAG number={nbAccountsRealTime} text="Nombre de comptes connectés" />
      </div>
      <div style={{ margin: '25px' }} />

      <div>
        <RectangleAG number={nbAccounts} text="Nombre de comptes créés cette semaine"/>
      </div>
      <div style={{ margin: '25px' }} />
      <div>
        <BarChart lastWeekCount={10} thisWeekCount={nbAccounts}></BarChart>
      </div>
      <div style={{ margin: '25px' }} />
      <div>
        <RectangleRG number={476} text="Nombre de recommendations générées" />
      </div>
    </Box>
  );
};

export default PlaygroundView;
