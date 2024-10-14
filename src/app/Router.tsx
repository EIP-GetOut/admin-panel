import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import StatisticsView from '../views/Statistics';
import ModerationView from '../views/ModerationView';
import HistoryView from '../views/HistoryView';
import UserOverview from '../views/UsersOverview';
import NewsView from '../views/NewsView';
import { useEffect, useState } from 'react'
import { BackendStatusInterface, apiRootPath } from '../conf/backendStatus'
import useCurrentAccount from '../services/CurrentAccountContext'
import LoadingPage from '../components/LoadingPage'
import HomeIcon from '../components/Navigate';


const Router = () => {
	const [backendStatus, setBackendStatus] = useState<BackendStatusInterface | null>(null);
  const { currentAccount, setCurrentAccount } = useCurrentAccount()
  const isConnected = false

  useEffect(() => {
    let isSubscribed = true
    const fetchBackendStatus = async () => {
      try {
        const response = await fetch(apiRootPath, {cache: 'no-store'});
        if (response.ok) {
          const data = await response.json();
          isSubscribed && setBackendStatus({ status: 'Running', version: data.tag });
        } else {
          isSubscribed && setBackendStatus({ status: 'Down' });
        }
      } catch (error) {
        console.error('Error fetching backend status:', error);
        isSubscribed &&  setBackendStatus({ status: 'Down' });
      }
    };

    // isSubscribed && setBackendStatus({ status: 'Running', version: 'v0.6.5' });
    fetchBackendStatus()

    return () => {isSubscribed = false}
  }, [])

	if (backendStatus === null) {
		return <LoadingPage/>
	}

	return (
  <BrowserRouter>
    <div style={{ paddingTop: '60px' }}>
      <HomeIcon />
      <div style={{ marginTop: '20px' }}>
        <Routes>
          <Route path={'/'} element={<HomeView backendStatus={backendStatus} />} />
          <Route path={'/login'} element={<LoginView />} />
          <Route path={'/user-overview'} element={<UserOverview />} />
          <Route path={'/statistics'} element={<StatisticsView />} />
          <Route path={'/moderation'} element={<ModerationView />} />
          <Route path={'/history'} element={<HistoryView />} />
          <Route path={'/news'} element={<NewsView />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
  );
};

export default Router;
