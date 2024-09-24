/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Alexandre Chetrit <chetrit.pro@hotmail.com>
*/

import PropTypes from 'prop-types'
import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react'

import { apiRootPath } from '../conf/backendStatus'
import LoadingPage from '../components/LoadingPage'

// Define the type for the account (adapt it to your actual data structure)
interface Account {
  // Define the fields of the account, for example:
  id: string
  username: string
  email: string
}

// Type for the context value
interface CurrentAccountContextType {
  currentAccount: Account | 'loading' | null;
  setCurrentAccount: Dispatch<SetStateAction<Account | 'loading' | null>>;
}

function getSession () {
  return fetch(`${apiRootPath}/session`, {
    method: 'GET',
    credentials: 'include'
  })
}

function computeGetSession () {
  return getSession().then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Error while getting session')
  }).then((sess) => {
    return sess.account
  }).catch(console.error)
}

// Provide a default value for the context (null by default)
const CurrentAccountContext = createContext<CurrentAccountContextType | undefined>(undefined)

function useCurrentAccount() {
  const context = useContext(CurrentAccountContext)
  if (!context) {
    throw new Error('useCurrentAccount must be used within a CurrentAccountProvider')
  }
  return context
}

// Type for the provider props
interface CurrentAccountProviderProps {
  children: ReactNode;
}

function CurrentAccountProvider({ children }: CurrentAccountProviderProps) {
  const [currentAccount, setCurrentAccount] = useState<Account | 'loading' | null>('loading')

  useEffect(() => {
    let isSubscribed = true

    computeGetSession().then((account) => {
      if (isSubscribed) {
        setCurrentAccount(account)
      }
    })

    return () => { isSubscribed = false }
  }, [])

  if (currentAccount === 'loading') {
    return <LoadingPage/>
  }

  return (
    <CurrentAccountContext.Provider value={{ currentAccount, setCurrentAccount }}>
      {children}
    </CurrentAccountContext.Provider>
  )
}

// Since we use TypeScript, you don't need PropTypes anymore
// But if you still want to enforce them, you can keep this
CurrentAccountProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { useCurrentAccount as default, CurrentAccountProvider }
