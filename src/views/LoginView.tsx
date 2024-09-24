import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiRootPath } from '../conf/backendStatus'
import useCurrentAccount from '../services/CurrentAccountContext'
import computeLogout from '../services/logoutAccount'
import LoadingPage from '../components/LoadingPage'
// import { setConnected } from '../app/Router';


async function checkPermission(): Promise<boolean> {
  const response = await axios.get(`${apiRootPath}/permission/Can-Access-Admin-Panel`, {
    withCredentials: true, headers: {'Content-Type': 'application/json'}
  })
  return (response.data)
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { currentAccount, setCurrentAccount } = useCurrentAccount()


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiRootPath}/account/login`, { email, password }, { withCredentials: true, headers: {'Content-Type': 'application/json'} });
      if (response.status !== 200) {
        alert('Login failed');
      }
      const hasPermission = await checkPermission()
      if (hasPermission) {
        setCurrentAccount(response.data.account);
      } else {
        computeLogout().then(() => {
          setCurrentAccount(null)
        })
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (currentAccount != null) {
      navigate('/')
    }
  }, [currentAccount])

  if (currentAccount != null) {
    return <LoadingPage/>
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input type={'email'} placeholder={'Adresse email'} value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: '10px', padding: '10px', fontSize: '16px', border: '2px solid black' }} />
        <input type={'password'} placeholder={'Mot de passe'} value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: '10px', padding: '10px', fontSize: '16px', border: '2px solid black' }} />
        <button type={'submit'} style={{ padding: '10px', fontSize: '16px', border: '2px solid black' }}>Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;