import { Table, Thead, Tbody } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// @ts-ignore
const DataTable = ( { datas } ) => {
    
    return (
        <Table variant="striped" colorScheme="teal">
			<Thead textAlign="left">
				<tr>
					<th>User ID</th>
					<th>Profil</th>
					<th>first name</th>
					<th>last name</th>
					<th>Email</th>
					<th>created at</th>
					<th>ban?</th>
				</tr>
			</Thead>
            <Tbody >
                {datas.map((data: any) => (
                    <tr key={data.id}>
                        <td>{data.id}</td>
                        <td>
                            <Link to={`/users/${data.id}`}>Profile</Link>
                        </td>
                        <td>{data.firstName}</td>
                        <td>{data.lastName}</td>
                        <td>{data.email}</td>
                        <td>{data.createdDate}</td>
                        <td>{data.ban}</td>
                    </tr>
                ))}
            </Tbody>
		</Table>
    )
}

export default DataTable;