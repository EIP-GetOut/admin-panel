import { Box } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons'
import React, { useState, useEffect, CSSProperties } from 'react';
import SignUpForm from './SignupForm';

import { apiRootPath } from '../conf/backendStatus';

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
  const [showModal, setShowModal] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

  const handleDelete = async (userId: string): Promise<void> => {
    try {
      const response = await fetch(`${apiRootPath}/accounts/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      fetchUsers(page);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user: User): void => {
    setEditUserId(user.id);
    setEditUser({ ...user });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (editUser) {
      setEditUser({ ...editUser, [e.target.name]: e.target.value });
    }
  };

  const handleValidate = async (): Promise<void> => {
    if (editUser) {
      try {
        const response = await fetch(`${apiRootPath}/accounts/${editUser.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editUser),
        });
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        setEditUserId(null);
        fetchUsers(page);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleCancelEdit = (): void => {
    setEditUserId(null);
    setEditUser(null);
  };

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
    marginRight: '5px',
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
              {editUserId === user.id ? (
                <>
                  <td style={thTdStyle}>
                    <input
                      type={'text'}
                      name={'firstName'}
                      value={editUser?.firstName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td style={thTdStyle}>
                    <input
                      type={'text'}
                      name={'lastName'}
                      value={editUser?.lastName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td style={thTdStyle}>
                    <input
                      type={'email'}
                      name={'email'}
                      value={editUser?.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td style={thTdStyle}>
                    <button
                      style={{ ...buttonStyle, backgroundColor: 'green', marginRight: '10px' }}
                      onClick={handleValidate}
                    >
                      Valider
                    </button>
                    <button
                      style={{ ...buttonStyle, backgroundColor: 'red' }}
                      onClick={handleCancelEdit}
                    >
                      Annuler
                    </button>
                  </td>
                </>
              ) : (
                <>
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
                    <EditIcon
                      style={{ marginLeft: '10px', cursor: 'pointer' }}
                      color={'black'}
                      onClick={() => handleEdit(user)}
                    />
                  </td>
                </>
              )}
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={openModal}
        >
          Créer un compte
        </button>
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '400px',
                width: '100%'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '80px',
                  cursor: 'pointer'
                }}
                onClick={closeModal}
              >
                &times;
              </span>
              <h2>Créer un compte</h2>
              <SignUpForm closeModal={closeModal} />
            </div>
          </div>
        )}
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