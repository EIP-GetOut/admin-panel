import { Box } from '@chakra-ui/react';
import React, { useState, useEffect, CSSProperties } from 'react';

const apiRootPath = 'https://api.eip-getout.me'

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type ApiResponse = {
  accounts: {
    list: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      // other fields are omitted
    }[];
    accountCreatedLastWeek: number;
  };
};

function extractUserInfo(response: ApiResponse): User[] {
  return response.accounts.list.map(account => ({
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
  }));
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  // Function to fetch users from backend
  const fetchUsers = async (page: number): Promise<void> => {
    try {
      const response = await fetch(`${apiRootPath}/accounts/${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ApiResponse = await response.json();
      const userList = extractUserInfo(data);

      if (userList.length === 0) {
        setIsLastPage(true);
        if (page > 1) {
          setPage(prevPage => prevPage - 1);
        }
      } else {
        setIsLastPage(false);
        setUsers(userList);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to delete a user
  const handleDelete = async (userId: string): Promise<void> => {
    try {
      const response = await fetch(`${apiRootPath}/accounts/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      // Refetch users after deletion
      fetchUsers(page);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Fetch users when the component mounts and when the page changes
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const tableStyle: CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle: CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  const thStyle: CSSProperties = {
    backgroundColor: '#f2f2f2',
  };

  const buttonStyle: CSSProperties = {
    padding: '5px 10px',
    color: 'white',
    backgroundColor: 'red',
    border: 'none',
    cursor: 'pointer',
  };

  const buttonHoverStyle: CSSProperties = {
    backgroundColor: 'darkred',
  };

  const paginationButtonStyle: CSSProperties = {
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const paginationButtonDisabledStyle: CSSProperties = {
    ...paginationButtonStyle,
    backgroundColor: '#d3d3d3',
    cursor: 'not-allowed',
  };

  const paginationContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...thStyle }}>Prénom</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Nom de famille</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Adresse email</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={thTdStyle}>{user.firstName}</td>
              <td style={thTdStyle}>{user.lastName}</td>
              <td style={thTdStyle}>{user.email}</td>
              <td style={thTdStyle}>
                <button
                  style={buttonStyle}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor!)}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor!)}
                  onClick={() => handleDelete(user.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={paginationContainerStyle}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={page === 1 ? paginationButtonDisabledStyle : paginationButtonStyle}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px', fontSize: '16px' }}>Page {page}</span>
        <button
          onClick={() => !isLastPage && setPage(page + 1)}
          disabled={isLastPage}
          style={isLastPage ? paginationButtonDisabledStyle : paginationButtonStyle}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const UserOverview: React.FC = () => {
  return (
    <Box>
      <div>
        <UserTable />
      </div>
    </Box>
  );
};

export default UserOverview;
