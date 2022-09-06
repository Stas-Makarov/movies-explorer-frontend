import { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const useUser = () => useContext(CurrentUserContext);
