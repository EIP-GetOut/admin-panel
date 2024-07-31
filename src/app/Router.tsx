import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import StatisticsView from '../views/Statistics';
import ModerationView from '../views/ModerationView';
import HistoryView from '../views/HistoryView';
import UserOverview from '../views/UsersOverview';
import { useEffect, useState } from 'react'
import { BackendStatusInterface, apiRootPath } from '../conf/backendStatus'



const Router = () => {
	const [backendStatus, setBackendStatus] = useState<BackendStatusInterface | null>(null);

  useEffect(() => {
    const fetchBackendStatus = async () => {
      try {
        const response = await fetch(apiRootPath);
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
      {backendStatus && <Route path={'/user-overview'} element={<UserOverview />} />}
      {backendStatus && <Route path={'/statistics'} element={<StatisticsView />} />}
      {backendStatus && <Route path={'/moderation'} element={<ModerationView />} />}
      {backendStatus && <Route path={'/history'} element={<HistoryView />} />}
      {backendStatus && <Route path={'/home'} element={<HomeView backendStatus={backendStatus}/>} />}
    </Routes>
  </BrowserRouter>
	);
}
export default Router;
