import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar, Switch, useTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, Card, Title, Paragraph, Divider } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { isDarkTheme } = props;
  const theme = useTheme(); // Get the current theme

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.drawerContentContainer,
        { backgroundColor: theme.colors.background }, // Set the background color
      ]}
    >
      <View style={styles.drawerHeader}>
        <Icon
          name="speedometer"
          size={50}
          color={isDarkTheme ? '#80d4ff' : '#007acc'}
        />
        <Text style={[styles.brandName, isDarkTheme ? styles.darkBrandName : styles.lightBrandName]}>
          SpeedTrack
        </Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
      </View>

      <Card style={[styles.supportCard, isDarkTheme ? styles.darkCard : styles.lightCard]}>
        <Card.Content>
          <Title style={[styles.cardTitle, isDarkTheme ? styles.darkCardTitle : styles.lightCardTitle]}>
            Support for Palestine and Bangladesh
          </Title>
          <Paragraph style={[styles.cardText, isDarkTheme ? styles.darkCardText : styles.lightCardText]}>
            We stand in solidarity with the people of Palestine and Bangladesh.
          </Paragraph>
          <View style={styles.flagContainer}>
            <Image
              source={require('../../assets/BangladeshFlag.png')}
              style={styles.flag}
            />
            <Image
              source={require('../../assets/PalestineFlag.png')}
              style={styles.flag}
            />
          </View>
        </Card.Content>
      </Card>
    </DrawerContentScrollView>
  );
}

export default function MainLayout({ toggleTheme, isDarkTheme }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} isDarkTheme={isDarkTheme} />}
        screenOptions={{
          header: ({ navigation, route, options }) => {
            return (
              <Appbar.Header style={[styles.appBar, isDarkTheme ? styles.darkAppBar : styles.lightAppBar]}>
                <Appbar.Action
                  icon={() => <Icon name="menu" size={24} color={isDarkTheme ? '#d1e6ff' : '#ffffff'} />}
                  onPress={() => navigation.toggleDrawer()}
                />
                <Appbar.Content title={route.name} titleStyle={styles.appBarTitle} />
                <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>{isDarkTheme ? 'Dark' : 'Light'}</Text>
                  <Switch
                    value={isDarkTheme}
                    onValueChange={toggleTheme}
                    color={isDarkTheme ? '#80d4ff' : '#007acc'} // Switch color
                  />
                </View>
              </Appbar.Header>
            );
          },
          drawerContentStyle: isDarkTheme ? styles.darkDrawerContent : styles.lightDrawerContent,
          drawerInactiveTintColor: isDarkTheme ? '#d1e6ff' : '#1c1c1c',
          drawerActiveTintColor: isDarkTheme ? '#80d4ff' : '#007acc',
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
    elevation: 4,
  },
  lightAppBar: {
    backgroundColor: '#007acc', // Light theme primary color
  },
  darkAppBar: {
    backgroundColor: '#1a2b3c', // Dark theme primary color
  },
  appBarTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    color: '#ffffff',
    marginRight: 8,
  },
  drawerHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  lightBrandName: {
    color: '#007acc',
  },
  darkBrandName: {
    color: '#80d4ff',
  },
  drawerContentContainer: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
  },
  lightDrawerContent: {
    backgroundColor: '#e6f2ff', // Light theme drawer background
  },
  darkDrawerContent: {
    backgroundColor: '#0d1a26', // Dark theme drawer background
  },
  supportCard: {
    marginHorizontal: 15,
    marginVertical: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 8,
  },
  lightCard: {
    backgroundColor: '#ffffff',
  },
  darkCard: {
    backgroundColor: '#1a2b3c',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  lightCardTitle: {
    color: '#007acc',
  },
  darkCardTitle: {
    color: '#80d4ff',
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  lightCardText: {
    color: '#1c1c1c',
  },
  darkCardText: {
    color: '#d1e6ff',
  },
  divider: {
    marginVertical: 10,
  },
  flagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  flag: {
    width: 45,
    height: 30,
    resizeMode: 'contain',
  },
});

