import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import User from '../../models/user';
import { useCurrentUserId, useToken } from '../../services/storedValue';

export type Auth = {
  token: string | null,
  currentUserId: string | null
}

export const CurrentUserContext = React.createContext<{
  currentUser: User | null,
  auth: Auth,
  setAuth: (auth: Auth) => void
}>({
  currentUser: null,
  auth: { token: null, currentUserId: null },
  setAuth: () => { }
})
export const useCurrentUserContext = () => {
  return React.useContext(CurrentUserContext)
}

interface CurrentUserContextProviderProps { children: React.ReactNode }

export const CurrentUserContextProvider: FC<CurrentUserContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const { token, setToken } = useToken()
  const { currentUserId, setCurrentUserId } = useCurrentUserId()
  const setAuth = (auth: Auth) => {
    setToken(auth.token)
    setCurrentUserId(auth.currentUserId)
  }

  useEffect(() => {
    if (token && currentUserId) {
      axios.get(
        `api/auth/users/${currentUserId}.json`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      ).then(function (response) {
        setCurrentUser(response.data)
      })
    } else {
      setCurrentUser(null)
    }
  }, [token, currentUserId])

  return (
    <CurrentUserContext.Provider value={{ currentUser, auth: { token, currentUserId }, setAuth }}>
      {children}
    </CurrentUserContext.Provider>
  )
};

