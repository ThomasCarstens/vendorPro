import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/vendorprologo.webp')} style={styles.logo} />
      <View style={styles.titleContainer}>
        <Text style={styles.appTitle}>VendorPro</Text>
        <Text style={styles.appSlogan}>Towards autonomous vending machines</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.verticalLine} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RestrainedTabs')}
        >
          <Text style={styles.buttonTitle}>My Machines</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D7', // Changed to white to match the logo background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 250,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    color: '#00008B',
    fontSize: 24,
    fontWeight: 'bold',
  },
  appSlogan: {
    color: '#00008B',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  verticalLine: {
    width: 2,
    height: 60,
    backgroundColor: 'black',
    marginRight: 15,
  },
  button: {
    backgroundColor: '#00008B',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginScreen;