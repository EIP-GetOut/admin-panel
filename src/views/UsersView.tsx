import React from 'react';
import Header from '../components/Header';
import { Text, Center } from '@chakra-ui/react';
import DataTable from '../components/DataTable';

const UsersView = () => {
	const [users, setUsers] = React.useState([]);

	const fetchUsers = () => {
		fetch("users.json").then((response) => response.json()).then((data) => setUsers(data));
	}

	React.useEffect(() => {
		fetchUsers();
	}
		, []);

	return (
		<>
			<Header />
			<Text marginLeft={200} marginTop={200}>Liste d'utilisateurs</Text>
			<Center marginTop={200}>
				<DataTable datas={users} />
			</Center>
		</>
	);
};

export default UsersView;
