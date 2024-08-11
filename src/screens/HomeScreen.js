import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { useTheme, Surface, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';

export default function HomeScreen() {
  const theme = useTheme(); 
  const [speed, setSpeed] = useState(0);
  const [networkType, setNetworkType] = useState('Unknown');
  const [isConnected, setIsConnected] = useState(true);
  const [ipAddress, setIpAddress] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchNetworkDetails = async () => {
      const state = await NetInfo.fetch();
      setNetworkType(state.type);
      setIsConnected(state.isConnected);

      if (state.details && state.details.ipAddress) {
        setIpAddress(state.details.ipAddress);
      }
    };

    const measureSpeed = async () => {
      const startTime = new Date().getTime();
      const downloadSize = 5000000; 
      const downloadUrl = 'https://speed.hetzner.de/5MB.bin'; 

      try {
        const response = await fetch(downloadUrl);
        const endTime = new Date().getTime();
        const duration = (endTime - startTime) / 1000; 
        const speedBps = (downloadSize * 8) / duration; 

        setSpeed(speedBps);
      } catch (error) {
        console.log('Speed measurement failed', error);
        setSpeed(0);
      }
    };

    fetchNetworkDetails();
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
      <Surface style={[styles.speedContainer, { backgroundColor: theme.colors.surface }]}>
        <Icon name="speedometer" size={48} color={theme.colors.primary} />
        <Text style={[styles.speedText, { color: theme.colors.text }]}>{formatSpeed(speed)}</Text>
        <Text style={[styles.label, { color: theme.colors.text }]}>Current Internet Speed</Text>
      </Surface>
      <Surface style={[styles.infoContainer, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.infoText, { color: theme.colors.text }]}>
          Network Type: {networkType}
        </Text>
        <Text style={[styles.infoText, { color: theme.colors.text }]}>
          Connected: {isConnected ? 'Yes' : 'No'}
        </Text>
        <Button mode="contained" onPress={toggleModal} style={styles.detailsButton}>
          Details
        </Button>
      </Surface>
      
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Network Details</Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>Network Type: {networkType}</Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>IP Address: {ipAddress}</Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>Download Speed: {formatSpeed(speed)}</Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>Connected: {isConnected ? 'Yes' : 'No'}</Text>
            <Button mode="contained" onPress={toggleModal} style={styles.closeButton}>
              Close
            </Button>
          </View>
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
  },
  speedText: {
    fontSize: 42,
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
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
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
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
  },
});
