import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Switch, Text } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

export default function MainLayout({ toggleTheme, isDarkTheme }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: ({ navigation, route, options }) => {
            return (
              <Appbar.Header style={[styles.appBar, isDarkTheme ? styles.darkAppBar : styles.lightAppBar]}>
                <Appbar.Action
                  icon={() => <Icon name="menu" size={24} color="#ffffff" />}
                  onPress={() => navigation.toggleDrawer()}
                />
                <Appbar.Content title={route.name} titleStyle={styles.appBarTitle} />
                <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>{isDarkTheme ? 'Dark' : 'Light'}</Text>
                  <Switch
                    value={isDarkTheme}
                    onValueChange={toggleTheme}
                    color="#ffffff" // Switch color
                  />
                </View>
              </Appbar.Header>
            );
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color }) => <Icon name="home-outline" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Info"
          component={InfoScreen}
          options={{
            drawerIcon: ({ color }) => <Icon name="information-outline" size={24} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appBar: {
    // General AppBar styles
  },
  lightAppBar: {
    backgroundColor: '#007acc', // Light theme primary color
  },
  darkAppBar: {
    backgroundColor: '#1a2b3c', // Dark theme primary color
  },
  appBarTitle: {
    color: '#ffffff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    color: '#ffffff',
    marginRight: 8,
  },
});
