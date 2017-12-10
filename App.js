/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { BleManager } from 'react-native-ble-plx';
import BluetoothSerial from 'react-native-bluetooth-serial'
import { StackNavigator} from 'react-navigation';

import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import HomeScreen from './src/HomeScreen';
import MainScreen from './src/MainScreen';

export default class App extends Component<{}> {
    
  constructor(props) {
    super(props);
    //this.manager = new BleManager();
  }
  
  componentWillUnmount() {
    
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            // Handle error (scanning will be stopped automatically)
            return
        }

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        console.log(device.name);
        if (device.name === 'Adafruit Bluefruit LE') {
            
            // Stop scanning as it's not necessary if you are scanning for one device.
            this.manager.stopDeviceScan();

            device.connect()
            .then((device) => {
                console.log(device);
                console.log(device.discoverAllServicesAndCharacteristics());
                //this.fetchServicesAndCharacteristicsForDevice(device);
            })
            .then((device) => {
               // Do work on device with services and characteristics
            })
            .catch((error) => {
                // Handle errors
            });
        }
    });
  }

  render() {
    return (
      <NavStack />
    );
  }
}

const NavStack = StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,      
  },
  Home: {
    screen: HomeScreen,      
  },
  Main: {
    screen: MainScreen,      
  }
});
        
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
