import React from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import { ProgressBar, Caption, Headline, Surface, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProgressScreen({ progress }) {
  const theme = useTheme(); // Access the current theme
  const logoAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(logoAnimation, {
      toValue: 1,
      friction: 4,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [logoAnimation]);

  const progressPercentage = Math.round(progress * 100);

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoAnimation }], backgroundColor: theme.colors.surface }]}>
        <Icon name="speedometer" size={100} color={theme.colors.primary} />
      </Animated.View>
      <Headline style={[styles.appName, { color: theme.colors.primary }]}>SpeedTrack</Headline>
      <Caption style={[styles.subText, { color: theme.colors.text }]}>Monitoring your internet speed</Caption>
      <View style={[styles.progressBarContainer, { backgroundColor: theme.colors.onSurface }]}>
        <ProgressBar
          progress={progress}
          color={theme.colors.primary}
          style={styles.progressBar}
          accessibilityLabel={`Loading progress: ${progressPercentage}%`}
        />
      </View>
      <Text style={[styles.progressText, { color: theme.colors.primary }]}>{progressPercentage}%</Text>
      <Caption style={[styles.loadingText, { color: theme.colors.text }]}>Please wait...</Caption>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 60,
    elevation: 4,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '80%',
    marginBottom: 15,
    borderRadius: 10,
    padding: 5,
  },
  progressBar: {
    height: 25,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 15,
  },
});

