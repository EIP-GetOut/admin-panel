import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, Button } from '@chakra-ui/react';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import React, { useState, useEffect, CSSProperties } from 'react';
import SignUpForm from './SignupForm';
import { apiRootPath } from '../conf/backendStatus';
import { useNavigate } from 'react-router'
import useCurrentAccount from '../services/CurrentAccountContext'
import LoadingPage from '../components/LoadingPage'

type Role = {
  id: string;
  permissions: number;
  name: string;
  description: string;
}

type Preferences = {
  platforms: Array<string>;
  booksGenres: Array<string>;
  moviesGenres: Array<string>;
}

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  preferences?: Preferences;
  createdDate?: Date;
  role?: Role;
  modifiedDate?: string;
  isVerified?: boolean;
  welcomeEmailSent?: boolean;
};

type ApiResponse = {
  accounts: {
    list: User[];
    accountCreatedLastWeek: number;
  };
};

function extractUserInfo(response: ApiResponse): User[] {
  console.log(response.accounts.list)
  return response.accounts.list.map(account => ({
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    preferences: account.preferences,
    createdDate: account.createdDate,
    role: account.role,
    modifiedDate: account.modifiedDate || 'N/A',
    isVerified: account.isVerified || false,
    welcomeEmailSent: account.welcomeEmailSent || false
  }));
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null); // For viewing details

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

  const handleView = (user: User): void => {
    setViewUser(user); // Set the user to be viewed
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

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Prénom</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Nom de famille</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Adresse email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              {editUserId === user.id ? (
                <>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <input
                      type={'text'}
                      name={'firstName'}
                      value={editUser?.firstName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <input
                      type={'text'}
                      name={'lastName'}
                      value={editUser?.lastName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <input
                      type={'email'}
                      name={'email'}
                      value={editUser?.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <button
                      style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '5px 10px' }}
                      onClick={handleValidate}
                    >
                      Valider
                    </button>
                    <button
                      style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}
                      onClick={handleCancelEdit}
                    >
                      Annuler
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.firstName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.lastName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <button
                      style={{ padding: '5px 10px', color: 'white', backgroundColor: 'red', border: 'none', cursor: 'pointer', marginRight: '5px' }}
                      onClick={() => handleDelete(user.id)}
                    >
                      Supprimer
                    </button>
                    <EditIcon
                      style={{ marginLeft: '10px', cursor: 'pointer' }}
                      color={'black'}
                      onClick={() => handleEdit(user)}
                    />
                    <ViewIcon
                      style={{ marginLeft: '10px', cursor: 'pointer' }}
                      onClick={() => handleView(user)}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* View User Details Modal */}
      {viewUser && (
        <Modal isOpen={!!viewUser} onClose={() => setViewUser(null)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Détails de {viewUser.firstName} {viewUser.lastName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text><strong>Email:</strong> {viewUser.email}</Text>
              <Text><strong>First Name:</strong> {viewUser.firstName}</Text>
              <Text><strong>Last Name:</strong> {viewUser.lastName}</Text>
              <Text><strong>Preferences:</strong></Text>
              <Text style={{marginLeft: '25px'}}>
                <div>
                  <strong>Platforms: </strong> {viewUser.preferences?.platforms.join(', ')}
                </div>
                <div>
                  <strong>Book Genres: </strong> {viewUser.preferences?.booksGenres.join(', ')}
                </div>
                <div>
                  <strong>Movie Genres: </strong> {viewUser.preferences?.moviesGenres.join(', ')}
                </div>
              </Text>
              <Text><strong>Creation Date:</strong> {viewUser.createdDate ? new Date(viewUser.createdDate).toLocaleDateString() : 'N/A'}</Text>
              <Text><strong>Role:</strong> {viewUser.role?.name ? viewUser.role.name : 'User'}</Text>
              <Text><strong>Modify Date:</strong> {viewUser.modifiedDate ? new Date(viewUser.modifiedDate).toLocaleDateString() : 'N/A'}</Text>
              <Text><strong>Is Verified:</strong> {viewUser.isVerified ? 'Yes' : 'No'}</Text>
              <Text><strong>Welcome Email Sent:</strong> {viewUser.welcomeEmailSent ? 'Yes' : 'No'}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

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
              <h2>Créer un compte pour la bêta</h2>
              <SignUpForm closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const UserOverview: React.FC = () => {
  const navigate = useNavigate();
  const { currentAccount } = useCurrentAccount()

  useEffect(() => {
    if (currentAccount == null) {
      navigate('/login')
    }
  }, [currentAccount])

  if (currentAccount == null) {
    return <LoadingPage/>
  }

  return (
    <Box>
      <div>
        <UserTable />
      </div>
    </Box>
  );
};

export default UserOverview;
