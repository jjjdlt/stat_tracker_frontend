import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { tokens } from '@tamagui/themes';  // Use only tokens from Tamagui themes
import { createTamagui, styled, SizableText, H1, YStack, Button as ButtonTamagui } from 'tamagui';
import { Appearance } from 'react-native';  // Import Appearance for detecting color scheme

// Utility function to get the system's color theme (dark or light)
export const getSystemTheme = () => {
  const colorScheme = Appearance.getColorScheme(); // Detect system color scheme
  return colorScheme === 'dark' ? 'dark' : 'light';
};

// Define custom light and dark themes
const customThemes = {
  light: {
    background: '#FFFFFF',  // Light mode background
    text: '#000000',
    buttonBackground: '#6366F1',
  },
  dark: {
    background: '#000000',  // Dark mode background
    text: '#FFFFFF',
    buttonBackground: '#5a5fcf',
  },
};

const animations = createAnimations({
  bouncy: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    type: 'spring',
  },
  lazy: {
    damping: 20,
    type: 'spring',
    stiffness: 60,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
    type: 'spring',
  },
});

const headingFont = createInterFont();
const bodyFont = createInterFont();

export const Container = styled(YStack, {
  flex: 1,
  padding: 24,
});

export const Main = styled(YStack, {
  flex: 1,
  justifyContent: 'space-between',
  maxWidth: 960,
});

export const Title = styled(H1, {
  color: '$text',  // Use theme token for dynamic text color
  size: '$12',
});

export const Subtitle = styled(SizableText, {
  color: '$text',  // Use theme token for dynamic text color
  size: '$9',
});

export const Button = styled(ButtonTamagui, {
  backgroundColor: '$buttonBackground',  // Use theme token for button background
  borderRadius: 28,
  hoverStyle: {
    backgroundColor: '$buttonBackground',
  },
  pressStyle: {
    backgroundColor: '$buttonBackground',
  },
  maxWidth: 500,

  // Shadows
  shadowColor: '#000',
  shadowOffset: {
    height: 2,
    width: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  // Button text
  color: '#FFFFFF',
  fontWeight: '600',
  fontSize: 16,
});

const config = createTamagui({
  themes: {
    ...customThemes,  // Merge custom themes into the existing configuration
  },
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  tokens,  // Use tokens from @tamagui/themes for consistency
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
