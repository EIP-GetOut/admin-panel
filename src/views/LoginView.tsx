import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiRootPath } from '../conf/backendStatus'


async function checkPermission(): Promise<boolean> {
  const response = await axios.get(`${apiRootPath}/permission/Can-Access-Admin-Panel`, { withCredentials: true, headers: {'Content-Type': 'application/json'} })
  console.log(response.data)
  return (response.data)
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiRootPath}/account/login`, { email, password }, { withCredentials: true, headers: {'Content-Type': 'application/json'} });
      console.log(`res=${JSON.stringify(response.data, null, 2)}, status = ${response.status} type = ${typeof response.status}`)
      if (response.status === 200 ) {
        if (await checkPermission()) {
          navigate('/home')
        } else {
          alert('Login failed');
        }
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input type={'email'} placeholder={'Adresse email'} value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }} />
        <input type={'password'} placeholder={'Mot de passe'} value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }} />
        <button type={'submit'} style={{ padding: '10px', fontSize: '16px' }}>Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;