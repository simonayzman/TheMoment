import React, { Component } from 'react';
import { StyleSheet,  Text,  View,  Image, TouchableOpacity,  Modal} from 'react-native';
import { Actions } from 'react-native-router-flux';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    backgroundColor: 'rgba(0,0,0,0)', // so text doesn't have a bg
    alignItems: 'center'
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
    marginBottom: 25,
    borderRadius: 5,
    borderWidth: 0.1,
    borderColor: 'rgba(0,0,0,0.2)',
    textAlign: 'center',
    borderWidth: 1,
    padding: 5,
    fontFamily:'Avenir',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 250,
    marginTop: 250
  },
  bg: { flex: 1, resizeMode: 'stretch'},
  bgwrap:{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }

});


export default class IntroPage extends Component {
  render() {
    return (
      <View>
        <View style={styles.bgwrap}><Image source={require('../assets/bg.jpg')} style={styles.bg} /></View>
        <View style={styles.container}>
          <Text style={styles.h1}>THE MOMENT</Text>
          <Text style={styles.h2}>LIVE IN THE MOMENT</Text>
          <TouchableOpacity onPress={Actions.mainPage}><Text style={styles.button}>GET STARTED</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}
