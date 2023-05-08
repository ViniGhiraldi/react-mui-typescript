import { createContext, useMemo, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

import { AuthService } from '../services/api/auth/AuthService';
import { Environment } from '../environment';

interface IAuthContext{
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void>;
    logout: () => void;
}

const AuthContext = createContext({} as IAuthContext)

export const useAuthContext = () => {
    return useContext(AuthContext);
}

interface IAuthProviderProps{
    children?: ReactNode;
}

export const AuthProvider = ({children}: IAuthProviderProps) => {
    const [accessToken, setAccessToken] = useState<string>();

    useEffect(()=>{
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);

        if(accessToken){
            setAccessToken(JSON.parse(accessToken));
        }else{
            setAccessToken(undefined);
        }
    }, [])

    const login = useCallback(async (email: string, senha: string): Promise<string | void> => {
        const result = await AuthService.auth(email, senha);
        if(result instanceof Error){
            return result.message;
        }
        localStorage.setItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken));
        setAccessToken(result.accessToken);
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        setAccessToken(undefined);
    }, [])

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
    
    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}