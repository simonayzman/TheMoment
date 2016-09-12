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
  ScrollView,
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
    price: 15,
    purchased: false,
  },
  {
    description: "Countdown Timer",
    price: 50,
    purchased: false,
  },
  {
    description: "Enlightenment Mode",
    price: 100,
    purchased: false,
  },
  {
    description: "Beach Soundscape",
    price: 250,
    purchased: false,
  },
  {
    description: "Namaste Mode",
    price: 500,
    purchased: false,
  },
  {
    description: "Button V-Neck",
    price: 1000,
    purchased: false,
  },
  {
    description: "YOLO Mode",
    price: 5000,
    purchased: false,
  },
  {
    description: "Couple Mode",
    price: 6900,
    purchased: false,
  },
];

class PurchaseStore extends Component {

  static propTypes = {
    purchasables: PropTypes.arrayOf(PropTypes.objects),
    actions: PropTypes.shape({
      purchaseLuxuryLiveButton: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = { purchasables };
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  onPressStoreItem(item){
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

  renderStoreItems() {
    return this.state.purchasables.map(
      (item, i) => {
        let price = this.numberWithCommas(item.price);
        if (item.purchased) {
          price = 'Purchased!';
        }
        return (
          <TouchableOpacity
            key={i}
            style={styles.row}
            onPress={() => this.onPressStoreItem(item)}
          >
            <Image style={styles.image} source={item.image} />
            <Text style={styles.description}>{item.description.toUpperCase()}</Text>
            <Text style={styles.price}>{price}</Text>
          </TouchableOpacity>
        );
      }
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.h2}>
            {'Store'.toUpperCase()}
          </Text>
        </View>
        {this.renderStoreItems()}
      </ScrollView>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(null, mapDispatchToProps)(PurchaseStore);
