import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LightTheme, DarkTheme } from './../themes';

interface IThemeContextData{
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
};

interface IThemeProviderProps{
    children?: ReactNode
}

export const AppThemeProvider = ({children}: IThemeProviderProps) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if(theme){
            setThemeName(theme as ('light' | 'dark'));
        }
    }, [])

    const toggleTheme = useCallback(()=>{
        setThemeName(oldThemeName => {
            const newTheme = oldThemeName === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light') return LightTheme;

        return DarkTheme;
    }, [themeName]);

    return(
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};