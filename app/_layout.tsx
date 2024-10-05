import React, { ReactNode, Fragment } from 'react';
import { TamaguiProvider, Theme, YStack, Button, Text } from 'tamagui';
import { Stack } from 'expo-router'; // Handles navigation between screens
import config from '../tamagui.config'; // Your Tamagui configuration
import { GlobalStateProvider, useGlobalState } from '../context/GlobalState'; // Global state provider

// This layout wraps around all the screens
interface LayoutProps {
    children: ReactNode;  // Ensure children is properly typed
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <YStack flex={1} alignItems="center" justifyContent="center" space="$6" backgroundColor="$background">
            {children}  {/* Render children */}
        </YStack>
    );
};

// Unified wrapper to manage state and theme
const UnifiedLayout: React.FC = () => {
    return (
        <GlobalStateProvider>
            <TamaguiProvider config={config}>
                <LayoutWithTheme />
            </TamaguiProvider>
        </GlobalStateProvider>
    );
};

// Layout that accesses global state AFTER GlobalStateProvider is initialized
const LayoutWithTheme: React.FC = () => {
    const { theme, toggleTheme } = useGlobalState(); // Access global state

    return (
        <Theme name={theme}>
            <Layout>
                <Stack screenOptions={{ headerShown: false }} />
                <Button
                    onPress={toggleTheme}
                    marginTop="$4"
                    size="$6"
                    backgroundColor="$buttonBackground"
                    color="$buttonText"
                    position="absolute"
                    bottom={20}
                    right={20}
                >
                    <Text>Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode</Text>
                </Button>
            </Layout>
        </Theme>
    );
};

export default UnifiedLayout;
