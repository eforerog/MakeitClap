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

export default class LoginScreen extends Component {
  constructor(props){
    super(props);
  }
    
  static navigationOptions = {
    headerBackTitle: ' ',
    headerTintColor: '#ffffff',
    headerStyle: { backgroundColor: 'transparent', borderBottomWidth: 0, elevation: 0},
  };

  render() {
      return(
        <View style={{flex: 1, marginTop: -65,}}>
          <TouchableHighlight underlayColor={'rgba(200,200,200,0)'} style={{flex: 1}} onPress = {() => {this.props.navigation.navigate('Register');}}>
            <Image source={require('./images/Login.png')} style={styles.topBg}/>
          </TouchableHighlight>
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
    }
});