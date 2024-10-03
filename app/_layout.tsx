import React, { useEffect, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';
import { Stack } from 'expo-router'; // Use Stack from Expo Router for screen navigation
import config from '../tamagui.config'; // Your Tamagui configuration
import { GlobalStateProvider } from '../context/GlobalState'; // Import GlobalStateProvider for state management

const Layout = () => {
    const systemColorScheme = useColorScheme(); // Get system color scheme (light or dark)
    const [theme, setTheme] = useState(systemColorScheme); // Set initial theme based on system color scheme

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme); // Update theme on system color scheme change
        });

        // Clean up listener on component unmount
        return () => {
            subscription.remove(); // Correct way to remove the listener
        };
    }, []);

    return (
        <TamaguiProvider config={config}>
            <GlobalStateProvider>
                <Theme name={theme === 'dark' ? 'dark' : 'light'}>
                    <Stack screenOptions={{ headerShown: false }} />
                </Theme>
            </GlobalStateProvider>
        </TamaguiProvider>
    );
};

export default Layout;
