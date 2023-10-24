import Header from '../components/Header';
import { Text, Center } from '@chakra-ui/react';
import DataTable from '../components/DataTable';


const UsersView = () => {



	async function getUsers() {
		// for the moment load the users from the file ../conf/users.json
		// but later we will load them from the database
		// and we will use a pagination system
		const response = await fetch('../conf/users.json');
		const users = await response.json();
		return users;
	}

	const users = [
		{
			"id": "b5f282a4-7125-4698-8b6b-864bc8206f50",
			"email": "yo3@yo.com",
			"firstName": "Julien",
			"lastName": "Letoux",
			"bornDate": "2001-06-07",
			"createdDate": "2023-09-27T04:31:54.339Z"
		},
		{
			"id": "b5f282a4-7125-4698-8b6b-864bc8206f51",
			"email": "test@test.com",
			"firstName": "Tesse",
			"lastName": "Teur",
			"bornDate": "2001-06-07",
			"createdDate": "2023-09-27T04:31:54.339Z"
		}
	]


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
