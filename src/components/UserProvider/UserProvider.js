import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MAIN_ROUTE } from '../../constants';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const history = useNavigate();

    const api = useMemo(() => ({
        user,
        setUser: (userData) => setUser(userData),
        signOut: () => {
            localStorage.clear();
            setUser(null);
            history(MAIN_ROUTE, { replace: true });
        },
    }), [user, history]);



    return (
      <CurrentUserContext.Provider value={api}>
        {children}
      </CurrentUserContext.Provider>
    );
  };