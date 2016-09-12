import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MARGIN = 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)', // so text doesn't have a bg
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 55,
    textAlign: 'center',
    margin: 10,
    marginBottom: 25,
    fontFamily:'Avenir',
    color: 'white'
  },
  h2: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    marginBottom: 25,
    fontFamily:'Avenir-Light',
    color: 'white'
  },
  button: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    borderRadius: 25,
    borderWidth: 0.1,
    borderColor: 'rgb(255,255,255)',
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 250,
    textAlign: 'center',
    fontFamily:'Avenir',
    color: 'white',
    overflow: 'hidden',
//    marginBottom: 100,
  },
  bg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: 'stretch',
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  momentLogoWithTagline: {
    resizeMode: 'contain',
    width: SCREEN_WIDTH - MARGIN * 2,
    margin: MARGIN,
//    marginTop: bo,
  }
});


export default class IntroPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/bg.jpg')}
          style={styles.bg}
        >
          <Image
            source={require('../assets/moment-logo-with-tagline.png')}
            style={styles.momentLogoWithTagline}
          />
          <TouchableOpacity onPress={Actions.mainPage}>
            <Text style={styles.button}>
              GET STARTED
            </Text>
          </TouchableOpacity>
        </Image>
      </View>
    );
  }
}
