import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import StatisticsView from '../views/Statistics';
import ModerationView from '../views/ModerationView';
import HistoryView from '../views/HistoryView';
import UserOverview from '../views/UsersOverview';


const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/login" element={<LoginView />} />
			<Route path='/user-overview' element={<UserOverview/>} />
			<Route path="/statistics" element={<StatisticsView />} />
			<Route path="/moderation" element={<ModerationView />} />
			<Route path="/history" element={<HistoryView />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
