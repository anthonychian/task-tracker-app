import React from 'react'
import { Navigate } from 'react-router-dom';
import useLocalState from './useLocalStorage';
const PrivateRoute = ({children}) => {
    const [user, setUser] = useLocalState("","user");
  return user?children:<Navigate to="/login"/>;
  
}

export default PrivateRoute