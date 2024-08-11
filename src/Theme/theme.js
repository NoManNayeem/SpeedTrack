import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#007acc', // Rich blue as the primary color
    accent: '#005f99',  // Deep blue for accent color
    background: '#e6f2ff', // Soft light blue background
    surface: '#ffffff', // White surface color for contrast
    text: '#1c1c1c', // Dark gray for text readability
    secondary: '#8ab6d6', // Muted blue as secondary color
    error: '#d32f2f', // Keeping the deep red for error states
    notification: '#007acc', // Using primary blue for notifications
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#80d4ff', // Light cyan blue as the primary color
    accent: '#00bfff',  // Bright cyan for accent color
    background: '#0d1a26', // Dark blue-gray background
    surface: '#1a2b3c', // Darker blue-gray for surfaces
    text: '#d1e6ff', // Light bluish-gray text for readability
    error: '#cf6679', // Keeping soft red for error states
    notification: '#80d4ff', // Light cyan blue for notifications
  },
};
