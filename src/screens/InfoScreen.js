import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Surface, useTheme } from 'react-native-paper';

export default function InfoScreen() {
  const theme = useTheme(); // Access the current theme
  const scaleAnimation = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1.05,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>Tech Maestro</Text>
      <Animated.View
        style={[
          styles.imageContainer,
          { transform: [{ scale: scaleAnimation }] },
          { shadowColor: theme.dark ? '#fff' : '#000' }, // Dynamic shadow color based on theme
        ]}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => Linking.openURL('https://nayeem-islam.vercel.app')}
        >
          <Image
            source={require('../../assets/ProfilePhoto.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </Animated.View>
      <Surface style={[styles.infoContainer, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.name, { color: theme.colors.text }]}>Nayeem Islam</Text>
        <Text style={[styles.description, { color: theme.colors.text }]}>
          Project Lead || Software Engineer || Generative AI Expert
        </Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.github]}
            onPress={() => Linking.openURL('https://github.com/NoManNayeem/')}
          >
            <Icon name="github" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>GitHub</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, styles.linkedin]}
            onPress={() => Linking.openURL('https://www.linkedin.com/in/nayeemislam60053')}
          >
            <Icon name="linkedin" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>LinkedIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, styles.medium]}
            onPress={() => Linking.openURL('https://medium.com/@nomannayeem')}
          >
            <Icon name="medium" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Medium</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 90, // Slightly reduced to show more of the image
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  profileImage: {
    width: 220, // Increased size to show more of the image
    height: 260,
    borderRadius: 110, // Reduced to show more of the image
  },
  infoContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  github: {
    backgroundColor: '#333',
  },
  linkedin: {
    backgroundColor: '#0077b5',
  },
  medium: {
    backgroundColor: '#00ab6c',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 5,
  },
});
