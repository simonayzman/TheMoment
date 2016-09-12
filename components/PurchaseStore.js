import React, {
  Component,
  PropTypes,
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';

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

const purchasables  = [
  {
    description: "Luxury Button",
    price: 200,
    purchased: false,
  },
  {
    description: "Namaste Mode",
    price: 300,
    purchased: false,
  },
  {
    description: "Beach Soundscape",
    price: 900,
    purchased: false,
  },
  {
    description: "Button V-Neck",
    price: 1000,
    purchased: false,
  },
  {
    description: "Countdown Timer",
    price: 1000,
    purchased: false,
  },
  {
    description: "Enlightenment Mode",
    price: 10000,
    purchased: false,
  },
];

class PurchaseStore extends Component {

  static propTypes = {
    actions: PropTypes.shape({
      purchaseLuxuryLiveButton: PropTypes.func.isRequired,
    }).isRequired,
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  onPressStoreItem(event, item){
    console.log('PRESSED', event, item);
    if (item.description === 'Luxury Button' && !item.purchased) {
      this.props.actions.purchaseLuxuryLiveButton(item.price);
      for (let purchasableItem of purchasables) {
        if (purchasableItem.description === item.description) {
          purchasableItem.purchased = true;
          this.forceUpdate();
          break;
        }
      }
    }
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
          let price = this.numberWithCommas(item.price);
          if (item.purchased) {
            price = 'Purchased!';
          }
          return(
            <TouchableOpacity
              key={i}
              style={styles.row}
              onPress={(event) => this.onPressStoreItem(event, item)}
            >
              <Image style={styles.image} source={item.image} />
              <Text style={styles.description}>{item.description.toUpperCase()}</Text>
              <Text style={styles.price}>{price}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(null, mapDispatchToProps)(PurchaseStore);
