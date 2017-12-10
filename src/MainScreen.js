import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Modal,
  Picker,
  Animated,
  Easing,
  AsyncStorage,
  Switch,
  Share
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial'

export default class MainScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      discovering: false,
      devices: [],
      connected: false,
      isEnabled: false,
      frontTop: 390,
      frontLeft: 150,
      upperTop: 210,
      upperLeft: 150,
    }
  }
    
  componentWillMount() {
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values;
      console.log(values);
      this.setState({ isEnabled: values[0], devices: values[1] }, () =>{
        if(this.state.devices.length > 0){
            this.connect(this.state.devices[0]);
            this._interval = setInterval(() => {
                this.readData();
            }, 2000);
        }
      })
    })
    
    BluetoothSerial.on('bluetoothEnabled', () => {console.log("BT enabled");})
    BluetoothSerial.on('bluetoothDisabled', () => {console.log("BT disabled");})
    BluetoothSerial.on('connectionLost', () => {
      console.log("BT connectionLost");
      //this.setState({ connected: false })
    })
  }
    
  componentWillUnmount() {
    if(this.state.connected == true){
        clearInterval(this._interval);
        this.disconnect();   
    }
  }
    
  async readData(){
      var _data = await BluetoothSerial.read();
      console.log(_data);
  }
    
  connect (device) {
    this.setState({ connecting: true })
    BluetoothSerial.connect(device.id)
    .then((res) => {
      console.log('Connected to device ' + device.name);
      this.setState({ device, connected: true, connecting: false })
    })
    .catch((err) => console.log(err))
  }
    
  disconnect () {
    BluetoothSerial.disconnect()
    .then(() => this.setState({ connected: false }))
    .catch((err) => console.log(err))
  }

  toggleConnect (value) {
    if (value === true && this.state.device) {
      this.connect(this.state.device)
    } else {
      this.disconnect()
    }
  }
    
  static navigationOptions = {
    headerBackTitle: ' ',
    headerTintColor: '#ffffff',
    headerStyle: { backgroundColor: 'transparent', borderBottomWidth: 0, elevation: 0},
  };

  render() {
      return(
        <View style={{flex: 1, marginTop: -65,}}>
          <Image source={require('./images/Main.png')} style={styles.topBg}/>
          <View style={[styles.circle, {top: this.state.upperTop, left: this.state.upperLeft }]}></View>
          <View style={[styles.circle, {top: this.state.frontTop, left: this.state.frontLeft }]}></View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
    topBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    circle: {
        width: 20,
        height: 20,
        position: 'absolute',
        borderRadius: 10,
        backgroundColor: 'red'
    }
});