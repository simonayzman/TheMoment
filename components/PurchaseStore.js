import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

const purchasables  = [
  {
    description: "Luxury Button",
    price: 200,
  },
  {
    description: "Namaste Mode",
    price: 300,
  },
  {
    description: "Beach Soundscape",
    price: 900,
  },
  {
    description: "Button V-Neck",
    price: 1000,
  },
  {
    description: "Countdown Timer",
    price: 1000,
  },
  {
    description: "Enlightenment \n(Flashlight Mode)",
    price: 10000,
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#131B33',
  },
  h2: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    marginBottom: 25,
    fontFamily:'Avenir',
    color: 'white',
  },
  title: {
    borderBottomWidth: 2,
    borderBottomColor: '#A2A0A7',
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: '#A2A0A7',
    paddingTop: 10,
    paddingBottom: 10,
  },
  description: {
    flex: 2,
    padding: 20,
    fontSize: 17,
    color: 'white',
    fontFamily:'Avenir',
  },
  price: {
    flex: 1,
    padding: 20,
    fontSize: 17,
    textAlign: 'right',
    color: 'white',
    fontFamily:'Avenir',
  },
});


export default class PurchaseStore extends Component {
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  onPress(e, item){
    console.log('PRESSED',e, item)
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.title}>
          <Text style={styles.h2}>
            {'Store'.toUpperCase()}
          </Text>
        </View>

        {purchasables.map((item, i)=> {
          return(
            <TouchableOpacity key={i} onPress={e=>this.onPress(e, item)} style={styles.row}>
              <Image style={styles.image} source={item.image} />
              <Text style={styles.description}>{item.description.toUpperCase()}</Text>
              <Text style={styles.price}>{this.numberWithCommas(item.price)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
