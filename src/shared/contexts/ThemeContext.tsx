import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
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
    const toggleTheme = useCallback(()=>{
        /* themeName === 'light' ? setThemeName('dark') : setThemeName('light'); */
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
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