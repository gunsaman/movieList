import React, {createContext} from 'react';
import auth from '@react-native-firebase/auth';

export const userContext = createContext();

export const AuthProvider = ({children}) => {
    return (
      <h1>AuthService</h1>  
         
    )
}