import React, { useEffect, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { TamaguiProvider, Theme, YStack } from 'tamagui'; // Import YStack
import { Stack } from 'expo-router';
import config from '../tamagui.config';
import { GlobalStateProvider } from '../context/GlobalState';

const Layout = () => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState<'light' | 'dark'>(systemColorScheme === 'dark' ? 'dark' : 'light');  // Handle default case

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? 'dark' : 'light');  // Explicitly set only "light" or "dark"
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <TamaguiProvider config={config}>
            <GlobalStateProvider>
                <Theme name={theme}>
                    <YStack flex={1} backgroundColor="$background">
                        <Stack screenOptions={{ headerShown: false }} />
                    </YStack>
                </Theme>
            </GlobalStateProvider>
        </TamaguiProvider>
    );
};

export default Layout;
