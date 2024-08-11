import React from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import { ProgressBar, Caption, Headline, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProgressScreen({ progress }) {
  const progressColor = '#007acc'; // Primary color
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
    <Surface style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoAnimation }] }]}>
        <Icon name="speedometer" size={100} color="#007acc" />
      </Animated.View>
      <Headline style={styles.appName}>SpeedTrack</Headline>
      <Caption style={styles.subText}>Monitoring your internet speed</Caption>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={progress}
          color={progressColor}
          style={styles.progressBar}
          accessibilityLabel={`Loading progress: ${progressPercentage}%`}
        />
      </View>
      <Text style={styles.progressText}>{progressPercentage}%</Text>
      <Caption style={styles.loadingText}>Please wait...</Caption>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 60,
    elevation: 4,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    color: '#007acc',
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    color: '#555555',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '80%',
    marginBottom: 15,
    backgroundColor: '#e0e0e0',
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
    color: '#007acc',
  },
  loadingText: {
    fontSize: 16,
    color: '#777777',
    marginTop: 15,
  },
});
