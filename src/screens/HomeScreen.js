import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  const theme = useTheme(); // Access the current theme
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const fetchSpeed = () => {
      // Simulate fetching live internet speed
      const simulatedSpeed = (Math.random() * 100).toFixed(2);
      setSpeed(simulatedSpeed);
    };

    const interval = setInterval(fetchSpeed, 2000); // Update speed every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.speedContainer, { backgroundColor: theme.colors.surface }]}>
        <Icon name="speedometer" size={48} color={theme.colors.primary} />
        <Text style={[styles.speedText, { color: theme.colors.text }]}>{speed} Mbps</Text>
        <Text style={[styles.label, { color: theme.colors.text }]}>Current Internet Speed</Text>
      </Surface>
      <Surface style={[styles.infoContainer, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.infoText, { color: theme.colors.text }]}>
          Stay connected and keep track of your internet speed with SpeedTrack.
        </Text>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  speedContainer: {
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  speedText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  infoContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
