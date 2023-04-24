import { ReactNode, createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData{
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

interface IDrawerProviderProps{
    children?: ReactNode
}

export const useDrawerContext = () => {
    return useContext(DrawerContext);
};

export const DrawerProvider = ({children}: IDrawerProviderProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawerOpen = useCallback(()=>{
        /* themeName === 'light' ? setThemeName('dark') : setThemeName('light'); */
        setIsDrawerOpen(oldIsDrawerOpen => !oldIsDrawerOpen);
    }, []);

    return(
        <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen}}>
            {children}
        </DrawerContext.Provider>
    );
};