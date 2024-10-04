// src/theme-builder.ts
import { createThemeBuilder } from '@tamagui/theme-builder';

const palettes = {
    light: [
        'hsla(238, 79%, 78%, 1)', // Color palette for light mode
        'hsla(230, 13%, 53%, 0)',
        'hsla(230, 13%, 53%, 0.25)',
        'hsla(230, 13%, 53%, 0.5)',
        'hsla(230, 13%, 53%, 0.75)',
        'hsla(229, 13%, 53%, 1)',
        'hsla(256, 37%, 53%, 1)',
        // Add more colors as needed
    ],
    dark: [
        'hsla(238, 79%, 62%, 1)', // Color palette for dark mode
        'hsla(229, 13%, 33%, 0)',
        'hsla(229, 13%, 33%, 0.25)',
        'hsla(229, 13%, 33%, 0.5)',
        'hsla(229, 13%, 33%, 0.75)',
        'hsla(229, 13%, 33%, 1)',
        'hsla(256, 37%, 53%, 1)',
        // Add more colors as needed
    ],
};

const templates = {
    base: {
        background: 0,  // Index refers to the position in the palette
        color: 6,
    },
    subtle: {
        background: 1,
        color: 5,
    },
};

const themesBuilder = createThemeBuilder()
    .addPalettes(palettes)  // Add your light and dark palettes
    .addTemplates(templates)  // Add the templates
    .addThemes({
        light: {
            template: 'base', // Use the 'base' template for the light theme
            palette: 'light', // Use the light palette
        },
        dark: {
            template: 'base', // Use the 'base' template for the dark theme
            palette: 'dark', // Use the dark palette
        },
    })
    .addChildThemes({
        subtle: {
            template: 'subtle', // Define a subtle variant using the 'subtle' template
        },
    });

export const themes = themesBuilder.build();
