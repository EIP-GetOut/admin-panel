import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router'
import useCurrentAccount from '../services/CurrentAccountContext'
import LoadingPage from '../components/LoadingPage'

const HistoryView:React.FC = () => {
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
    <>
      <Header />
      <h1>Moderation</h1>
    </>
  )
};

export default HistoryView;
