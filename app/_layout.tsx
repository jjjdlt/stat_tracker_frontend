import React, { useEffect, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { TamaguiProvider, Theme, YStack } from 'tamagui'; // Import YStack
import { Stack } from 'expo-router';
import config from '../tamagui.config';
import { GlobalStateProvider } from '../context/GlobalState';

const Layout = () => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState(systemColorScheme);

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <TamaguiProvider config={config}>
            <GlobalStateProvider>
                <Theme name={theme === 'dark' ? 'dark' : 'light'}>
                    <YStack flex={1} backgroundColor="$background">
                        <Stack screenOptions={{ headerShown: false }} />
                    </YStack>
                </Theme>
            </GlobalStateProvider>
        </TamaguiProvider>
    );
};

export default Layout;
