import { Box, Button, Center } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { apiRootPath } from '../conf/backendStatus'
import { useNavigate } from 'react-router'
import useCurrentAccount from '../services/CurrentAccountContext'
import LoadingPage from '../components/LoadingPage'

async function fetchData(): Promise<number> {
  try {
    const response = await fetch(`${apiRootPath}/accounts/1`);
    const result = await response.json();
    return parseInt(result.accounts.accountCreatedLastWeek);
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
  }
  return 0;
}

async function fetchNbAccountsRealTime(): Promise<number> {
  try {
    const response = await fetch(`${apiRootPath}/sessions`)
    const result = await response.json()
    return parseInt(result.nbSessions)
  } catch (error) {
    console.error('oops')
  }
  return 0;
}
async function fetchNbAccountCreatedWeekBefore(): Promise<number> {
  try {
    const response = await fetch(`${apiRootPath}/stats/accounts`);
    const result = await response.json();
    return parseInt(result.numberOfAccounts);
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
  }
  return 0;
}

async function fetchnbRecomendationsGenerated(): Promise<number> {
  try {
    const response = await fetch(`${apiRootPath}/stats/recommendations`)
    const result = await response.json()
    return parseInt(result.numberOfRecommendations)
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

const BarChart: FC<BarChartProps> = ({ lastWeekCount, thisWeekCount }) => {
  const maxCount = Math.max(lastWeekCount, thisWeekCount);
  const calculateHeight = (count: number): string => {
    const maxHeight = 200;
    const ratio = (count / maxCount) * 100;
    const height = (ratio / 100) * maxHeight;
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

const RectangleAG: FC<RectangleRecommendationGenerated> = ({ number, text }) => {
  return (
    <div style={{ border: '1px solid black', marginLeft: '30%', marginRight: '30%', borderLeft: '1px solid black', borderRight: '1px solid black', padding: '1px', textAlign: 'center' }}>
      <div style={{ marginBottom: '1%' }}>{text}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{number}</div>
    </div>
  );
};

const RectangleRG: FC<RectangleRecommendationGenerated> = ({ number, text }) => {
  return (
    <div style={{ border: '1px solid black', marginLeft: '30%', marginRight: '30%', borderLeft: '1px solid black', borderRight: '1px solid black', padding: '1px', textAlign: 'center' }}>
      <div style={{ marginBottom: '1%' }}>{text}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{number}</div>
    </div>
  );
};

const handleSaveDatas = async (nbAccounts: number, nbAccountsRealTime: number, nbAccountCreatedWeekBefore: number, nbRecomendationsGenerated : number,) => {
  let version = 'undefined'

  const response = await fetch(apiRootPath);
  if (response.ok) {
    const data = await response.json();
    version = data.tag
  }
  const currentDate = new Date();
  const fileContent = {
    version,
    accountCreatedThisWeek: nbAccounts,
    nbAccountCreatedWeekBefore,
    nbAccountsRealTime,
    nbRecomendationsGenerated
  };
  const blob = new Blob([JSON.stringify(fileContent, null, 2)], { type: 'text/plain' });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `Datas_${currentDate.toLocaleString()}`;

  document.body.appendChild(link);

  link.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}

const PlaygroundView: React.FC = () => {
  const navigate = useNavigate();
  const { currentAccount } = useCurrentAccount()

  const [nbAccounts, setNbAccounts] = useState<number | null>(null);
  const [nbAccountsRealTime, setNbAccountsRealTime] = useState<number | null>(null);
  const [nbAccountsCreatedWeekBefore, setNbAccountCreatedWeekBefore] = useState<number | null>(null);
  const [nbRecomendationsGenerated, setNbRecomendationGeberated] = useState<number | null>(null);

  useEffect(() => {
    fetchData().then((nbAccounts) => {
      setNbAccounts(nbAccounts);
    });
    fetchNbAccountsRealTime().then((nbAccountsRealTime) => {
      setNbAccountsRealTime(nbAccountsRealTime);
    });
    fetchNbAccountCreatedWeekBefore().then((nbAccountCreatedWeekBefore) => {
      setNbAccountCreatedWeekBefore(nbAccountCreatedWeekBefore)
    });
    fetchnbRecomendationsGenerated().then((nbRecomendationsGenerated) => {
      setNbRecomendationGeberated(nbRecomendationsGenerated)
    });
  }, []);

  useEffect(() => {
    if (currentAccount == null) {
      navigate('/login')
    }
  }, [currentAccount])

  if (currentAccount == null || nbAccounts === null || nbAccountsRealTime === null
      || nbAccountsCreatedWeekBefore === null || nbRecomendationsGenerated === null) {
    return <LoadingPage/>
  }

  return (
    <Box>
      <div>
        <RectangleAG number={nbAccountsRealTime} text={'Nombre de comptes connectés'} />
      </div>
      <div style={{ margin: '1%' }} />

      <div>
        <RectangleAG number={nbAccounts} text={'Nombre de comptes créés cette semaine'}/>
      </div>
      <div style={{ margin: '1%' }} />
      <div>
        <BarChart lastWeekCount={nbAccountsCreatedWeekBefore} thisWeekCount={nbAccounts}></BarChart>
      </div>
      <div style={{ margin: '1%' }} />
      <div>
        <RectangleRG number={nbRecomendationsGenerated} text={'Nombre de recommendations générées'} />
      </div>
      <Center>
        <Button marginTop={'10%'} backgroundColor={'#d85444'} colorScheme={'red'} size={'lg'} onClick={() => handleSaveDatas(nbAccounts, nbAccountsRealTime, nbAccountsCreatedWeekBefore, nbRecomendationsGenerated)}>
          Sauvegarder les données
        </Button>
      </Center>
    </Box>
  );
};

export default PlaygroundView;