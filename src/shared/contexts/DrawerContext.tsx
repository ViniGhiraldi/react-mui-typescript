import { ReactNode, createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOption{
    icon: string;
    path: string;
    label: string;
}

interface IDrawerContextData{
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
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
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(()=>{
        /* themeName === 'light' ? setThemeName('dark') : setThemeName('light'); */
        setIsDrawerOpen(oldIsDrawerOpen => !oldIsDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[])=>{
        /* themeName === 'light' ? setThemeName('dark') : setThemeName('light'); */
        setDrawerOptions(newDrawerOptions);
    }, []);

    return(
        <DrawerContext.Provider value={{isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    );
};