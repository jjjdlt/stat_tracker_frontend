import React, { useEffect } from 'react';
import { TamaguiProvider, Theme, YStack } from 'tamagui';
import config from './tamagui.config';  // Import your existing Tamagui configuration
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import IndexScreen from '/app/index.tsx';  // Correct path based on your directory structure

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const App = () => {
    // Load custom fonts (inter) used in Tamagui
    const [fontsLoaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    });

    // Hide splash screen once fonts are loaded
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;  // Return nothing while fonts are loading

    return (
        // Wrap the app with TamaguiProvider to provide Tamagui configuration
        <TamaguiProvider config={config}>
            {/* Apply a light theme */}
            <Theme name="light">
                {/* Main layout container */}
                <YStack flex={1} alignItems="center" justifyContent="center">
                    {/* Render the Index screen */}
                    <IndexScreen />
                </YStack>
            </Theme>
        </TamaguiProvider>
    );
};

export default App;
