import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import StatisticsView from '../views/Statistics';
import ModerationView from '../views/ModerationView';
import HistoryView from '../views/HistoryView';
import UserOverview from '../views/UsersOverview';
import { useEffect, useState } from 'react'
import { BackendStatusInterface, apiRootPath } from '../conf/backendStatus'

export let isConnected = false;

export const setConnected = (status: boolean) => {
  isConnected = status;
};


const Router = () => {
	const [backendStatus, setBackendStatus] = useState<BackendStatusInterface | null>(null);

  useEffect(() => {
    const fetchBackendStatus = async () => {
      try {
        const response = await fetch(apiRootPath, {cache: 'no-store'});
        if (response.ok) {
          const data = await response.json();
          setBackendStatus({ status: 'Running', version: data.tag });
        } else {
          setBackendStatus({ status: 'Down' });
        }
      } catch (error) {
        console.error('Error fetching backend status:', error);
        setBackendStatus({ status: 'Down' });
      }
    };

    fetchBackendStatus();
  }, []);

	if (backendStatus == null) {
		return <></>
	}

	return (
  <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<LoginView/>} />
      {backendStatus && <Route path={'/login'} element={<LoginView />} />}
      {backendStatus && <Route path={'/user-overview'} element={isConnected ? <UserOverview /> : <Navigate to={'/login'}/>} />}
      {backendStatus && <Route path={'/statistics'} element={isConnected ? <StatisticsView /> : <Navigate to={'/login'}/>} />}
      {backendStatus && <Route path={'/moderation'} element={isConnected ? <ModerationView /> : <Navigate to={'/login'}/>} />}
      {backendStatus && <Route path={'/history'} element={isConnected ? <HistoryView /> : <Navigate to={'/login'}/>} />}
      {backendStatus && <Route path={'/home'} element={isConnected ? <HomeView backendStatus={backendStatus}/> : <Navigate to={'/login'}/>} />}
    </Routes>
  </BrowserRouter>
	);
}

export default Router;
