import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import MainLayout from './src/layout/MainLayout';
import ProgressScreen from './src/components/ProgressScreen';
import { LightTheme, DarkTheme } from './src/Theme/theme';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        await Font.loadAsync(Entypo.font);

        let progressValue = 0;
        const interval = setInterval(() => {
          progressValue += 0.1;
          setProgress(progressValue);
          if (progressValue >= 1) {
            clearInterval(interval);
          }
        }, 150);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
        setAppIsReady(true);
      }
    };

    loadResources();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  if (!appIsReady) {
    return <ProgressScreen progress={progress} />;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={isDarkTheme ? DarkTheme : LightTheme}>
        <View style={{ flex: 1 }}>
          <MainLayout toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
