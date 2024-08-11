import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator, Dimensions } from 'react-native';
import { useTheme, Surface, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
import * as Location from 'expo-location';
import axios from 'axios';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const theme = useTheme();
  const [speed, setSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [networkType, setNetworkType] = useState('Unknown');
  const [isConnected, setIsConnected] = useState(true);
  const [ipAddress, setIpAddress] = useState('');
  const [ping, setPing] = useState(0);
  const [location, setLocation] = useState(null);
  const [isp, setIsp] = useState('Fetching...');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNetworkDetails = async () => {
    const state = await NetInfo.fetch();
    setNetworkType(state.type);
    setIsConnected(state.isConnected);

    if (state.details && state.details.ipAddress) {
      setIpAddress(state.details.ipAddress);
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);

    const pingStart = new Date().getTime();
    await fetch('https://www.google.com');
    const pingEnd = new Date().getTime();
    setPing(pingEnd - pingStart);

    const uploadStartTime = new Date().getTime();
    const uploadSize = 2000000;
    await fetch('https://www.posttestserver.com/post.php?dir=example', {
      method: 'POST',
      body: new Blob([new Uint8Array(uploadSize)]),
    });
    const uploadEndTime = new Date().getTime();
    const uploadDuration = (uploadEndTime - uploadStartTime) / 1000;
    const uploadSpeedBps = (uploadSize * 8) / uploadDuration;
    setUploadSpeed(uploadSpeedBps);

    // Fetch ISP details using ip-api.com
    try {
      const response = await axios.get('http://ip-api.com/json/?fields=isp,query');
      setIsp(`${response.data.isp} (${response.data.query})`);
    } catch (error) {
      console.log('Failed to fetch ISP information', error);
      setIsp('Unavailable');
    }
  };

  const measureSpeed = async () => {
    setLoading(true);
    try {
      const startTime = new Date().getTime();
      const downloadSize = 5000000;
      const downloadUrl = 'https://speed.hetzner.de/5MB.bin';

      const response = await fetch(downloadUrl);
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      const speedBps = (downloadSize * 8) / duration;
      setSpeed(speedBps);
    } catch (error) {
      console.log('Speed measurement failed', error);
      setSpeed(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworkDetails();
    measureSpeed();
    const interval = setInterval(measureSpeed, 10000);

    return () => clearInterval(interval);
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const formatSpeed = (speedBps) => {
    if (speedBps >= 1000000) {
      return `${(speedBps / 1000000).toFixed(2)} Mbps`;
    } else {
      return `${(speedBps / 1000).toFixed(2)} Kbps`;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Internet Speed Card */}
      <Surface style={[styles.speedContainer, { backgroundColor: theme.colors.surface }]}>
        <Icon name="speedometer" size={48} color={theme.colors.primary} />
        <Text style={[styles.speedText, { color: theme.colors.text }]}>{loading ? 'Measuring...' : formatSpeed(speed)}</Text>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Current Internet Speed
        </Text>
        {loading && (
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            style={{ marginTop: 10 }}
          />
        )}
      </Surface>

      {/* Button to Open Network Info Modal */}
      <Button
        mode="contained"
        onPress={toggleModal}
        style={[styles.detailsButton, { backgroundColor: theme.colors.primary }]}
      >
        Show Network Info
      </Button>

      {/* Network Information Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Network Details</Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>Network Type: {networkType}</Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>IP Address: {ipAddress}</Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>ISP: {isp}</Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>Upload Speed: {(uploadSpeed / 1000000).toFixed(2)} Mbps</Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>Ping: {ping} ms</Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>
              Location: {location ? `${location.coords.latitude}, ${location.coords.longitude}` : 'Fetching...'}
            </Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>Connected: {isConnected ? 'Yes' : 'No'}</Text>
            <Button
              mode="contained"
              onPress={toggleModal}
              style={[styles.closeButton, { backgroundColor: theme.colors.primary }]}
            >
              Close
            </Button>
          </Animated.View>
        </View>
      </Modal>
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
    width: '100%',
  },
  speedText: {
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
  detailsButton: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
  },
});

