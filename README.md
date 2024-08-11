
# SpeedTrack - Internet Speed Meter

**SpeedTrack** is a modern, aesthetically designed internet speed meter application built using Expo and React Native Paper. It allows users to measure live internet speed and displays developer information. The app supports both light and dark themes, provides a dynamic splash screen, and has an intuitive user interface.

## Features

- **Live Internet Speed Meter**: Measure and display real-time internet speed.
- **Developer Information Screen**: Learn about the app's developer.
- **Theming**: Switch between light and dark themes seamlessly.
- **Animated Splash Screen**: Displays a dynamic loading screen with progress.
- **Persistent Status Bar Display**: Shows live internet speed in the device's status bar, even when the app is closed.

## Project Structure

```
SpeedTrack
│
├── src
│   ├── components
│   │   └── ProgressScreen.js
│   ├── layout
│   │   └── MainLayout.js
│   ├── navigation
│   │   ├── MainNavigation.js
│   │   └── DrawerNavigation.js
│   ├── screens
│   │   ├── HomeScreen.js
│   │   └── InfoScreen.js
│   └── theme
│       └── theme.js
├── assets
│   ├── logo.png
│   └── splash.png
└── App.js
```

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/speedtrack.git
    cd speedtrack
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the Expo server**:
    ```bash
    npm start
    ```

4. **Run on your device**:
   - Use the Expo Go app on your iOS or Android device.
   - Scan the QR code generated in the terminal.

## Usage

1. **Theming**: You can toggle between light and dark themes using the button in the app's main layout.
2. **View Internet Speed**: The app displays the live internet speed on the Home screen. It also shows the speed in the device's status bar.
3. **Developer Info**: Access the Developer Information screen via the navigation drawer.

## Theming

The app uses custom light and dark themes based on Material Design 3 (MD3) themes provided by React Native Paper. Colors are inspired by modern, minimalistic design principles with a focus on usability and aesthetics.

```javascript
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
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements or fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
