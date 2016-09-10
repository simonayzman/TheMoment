
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
    description: "Something Cool",
    price: 100,
    image: require('./images/clock.png')
  },
  {
    description: "Hyper Mode",
    price: 300,
    image: require('./images/stuff.png')
  },
  {
    description: "Disable Social",
    price: 400,
    image: require('./images/stuff.png')
  },
  {
    description: "Premium Green Live Button",
    price: 500,
    image: require('./images/stuff.png')
  },
]


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: 'gray',

  },
  description: {
    flex: 2,
    padding: 20
  },
  price: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 20
  },
  image: {
    width: 50,
    height: 50,
    margin: 20
  }
});


export class PurchaseStore extends Component {
  onPress(e, item){
    console.log('PRESSED',e, item)
  }
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
          Welcome to The Moment Store
        </Text>
        <Text style={styles.instructions}>
          These are some instructions
        </Text>

        {purchasables.map((item, i)=> {
          return(
            <TouchableOpacity key={i} onPress={e=>this.onPress(e, item)} style={styles.row}>
              <Image style={styles.image} source={item.image} />
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>Buy for {item.price} Moments</Text>
            </TouchableOpacity>
          );
        })}




      </View>
    );
  }
}


        // <TouchableOpacity onPress={this.onPress} style={styles.row}>
        //   <Image style={styles.image} source={require('./images/stuff.png')} />
        //   <Text style={styles.description}>Something Cool</Text>
        //   <Text style={styles.price}>Buy for 1000 Moments</Text>
        // </TouchableOpacity>

// AppRegistry.registerComponent('TheMoment', () => TheMoment);
