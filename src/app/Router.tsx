import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import PlaygroundView from '../views/PlaygroundView';
import ModerationView from '../views/ModerationView';
import HistoryView from '../views/HistoryView';
import UsersView from '../views/UsersView';


const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/login" element={<LoginView />} />
			<Route path="/playground" element={<PlaygroundView />} />
			<Route path="/moderation" element={<ModerationView />} />
			<Route path="/history" element={<HistoryView />} />
			<Route path="/users" element={<UsersView />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
