// src/theme-builder.ts
import { createThemeBuilder } from '@tamagui/theme-builder';

const palettes = {
    light: [
        'hsla(0, 0%, 85%, 1)',   // Off white for background
        'hsla(0, 0%, 0%, 1)',    // Black for text
        'hsla(0, 0%, 100%, 1)',  // Pure white for components (buttons, etc.)
        'hsla(229, 13%, 33%, 0.75)', // Other color if needed
        'hsla(238, 40%, 60%, 1)', // Optional extra color
        'hsla(256, 65%, 80%, 1)', // Optional extra color
        // Add more colors as needed
    ],
    dark: [
        'hsla(238, 30%, 50%, 1)', // Dark blue for background
        'hsla(0, 0%, 100%, 1)',   // White for text
        'hsla(0, 0%, 40%, 1)',    // Grey for components (buttons, etc.)
        'hsla(229, 13%, 33%, 0.75)', // Other color if needed
        'hsla(238, 40%, 60%, 1)',  // Optional extra color
        'hsla(256, 65%, 80%, 1)',  // Optional extra color
        // Add more colors as needed
    ],
};

const templates = {
    lightBase: {
        background: 0,  // Off white background
        text: 1,        // Black text
        buttonBackground: 2,  // Pure white buttons
        buttonText: 1,   // Black text on buttons
    },
    darkBase: {
        background: 0,  // Dark blue background
        text: 1,        // White text
        buttonBackground: 2,  // Grey buttons
        buttonText: 1,   // White text on buttons
    },
    lightSubtle: {
        background: 3,  // Lighter variant for background in subtle theme
        text: 4,        // Adjusted color for subtle theme text
        buttonBackground: 5,  // Subtle theme buttons
        buttonText: 4,   // Subtle theme text color for buttons
    },
    darkSubtle: {
        background: 3,  // Darker subtle variant for background
        text: 4,        // Subtle theme text color
        buttonBackground: 5,  // Subtle theme buttons
        buttonText: 4,   // Subtle theme text color for buttons
    },
};


const themesBuilder = createThemeBuilder()
    .addPalettes(palettes)  // Add your light and dark palettes
    .addTemplates(templates)  // Add the templates
    .addThemes({
        light: {
            template: 'lightBase', // Use the 'lightBase' template for the light theme
            palette: 'light',  // Reference the light palette
        },
        dark: {
            template: 'darkBase', // Use the 'darkBase' template for the dark theme
            palette: 'dark',  // Reference the dark palette
        },
    })
    .addChildThemes({
        light_subtle: {
            template: 'lightSubtle', // Define the subtle variant for light mode
            palette: 'light',        // Use the light palette
        },
        dark_subtle: {
            template: 'darkSubtle',  // Define the subtle variant for dark mode
            palette: 'dark',         // Use the dark palette
        },
    });


export const themes = themesBuilder.build();
