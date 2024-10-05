import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalStateProps {
    puuid: string | null;
    setPuuid: (puuid: string) => void;
    gameName: string | null;
    tagLine: string | null;
    setGameName: (gameName: string) => void;
    setTagLine: (tagLine: string) => void;
    theme: 'light' | 'dark';  // Theme state
    toggleTheme: () => void;   // Function to toggle theme
}

interface GlobalStateProviderProps {
    children: ReactNode;
}

const GlobalStateContext = createContext<GlobalStateProps | undefined>(undefined);

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
    const [puuid, setPuuid] = useState<string | null>(null);
    const [gameName, setGameName] = useState<string | null>(null);
    const [tagLine, setTagLine] = useState<string | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');  // Default to 'light'

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <GlobalStateContext.Provider value={{ puuid, setPuuid, gameName, setGameName, tagLine, setTagLine, theme, toggleTheme }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = (): GlobalStateProps => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};
