import React from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import config from '../tamagui.config';  // Import Tamagui configuration
import { Stack } from 'expo-router';  // Import Expo Router's Stack navigation
import { GlobalStateProvider } from '../context/GlobalState';  // Import the GlobalStateProvider

const Layout = () => {
    return (
        <GlobalStateProvider>
            <TamaguiProvider config={config}>
                <Theme name="light">
                    <Stack screenOptions={{ headerShown: false }}>
                        {/* Render the current screen based on the route */}
                    </Stack>
                </Theme>
            </TamaguiProvider>
        </GlobalStateProvider>
    );
};

export default Layout;
