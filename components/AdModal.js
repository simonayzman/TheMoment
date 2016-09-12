import React, {
  PropTypes,
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  PanResponder,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import keyMirror from 'keymirror';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const IMAGE_MARGIN = 15;

const ALL_ADS = [
  require('../assets/ads/tide.png'),
  require('../assets/ads/raid.png'),
  require('../assets/ads/miralax.png'),
  require('../assets/ads/twc.png'),
  require('../assets/ads/tropicana.png'),
  require('../assets/ads/viagra.png'),
];

const styles = StyleSheet.create({
  adView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adImage: {
    margin: IMAGE_MARGIN,
    width: SCREEN_WIDTH - IMAGE_MARGIN * 2,
    alignSelf: 'center',
  },
  cancelButtonView: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: 'red',
    width: 48,
    height: 48,
  },
  cancelButtonText: {
    fontSize: 48,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
  }
});

export default class MomentNotification extends Component {

  static propTypes = {
    shouldDisplay: PropTypes.bool,
    onDismiss: PropTypes.func.isRequired,
  };

  static defaultProps = {
    shouldDisplay: false,
  }

  constructor() {
    super();
    this.state = {
      currentAdIndex: -1,
    }
  }

  componentWillReceiveProps(props) {

    if (this.props.shouldDisplay !== props.shouldDisplay && props.shouldDisplay) {
      console.log('Will show ad at index: ' + this.state.currentAdIndex+1);
      this.setState({
        currentAdIndex: this.state.currentAdIndex+1,
      });
    }
  }

  getCurrentAdImage() {
    return ALL_ADS[this.state.currentAdIndex % ALL_ADS.length];
  }

  render() {
    const exit = '\u00D7';
    return (
      <Modal
        style={styles.adModal}
        animationType={'fade'}
        visible={this.props.shouldDisplay}
        transparent
      >
        <View style={styles.adView}>
          <Image
            source={this.getCurrentAdImage()}
            style={styles.adImage}
            resizeMode={'contain'}
          >
            <TouchableOpacity onPress={this.props.onDismiss}>
              <View style={styles.cancelButtonView}>
                <Text style={styles.cancelButtonText}>
                  {exit}
                </Text>
              </View>
            </TouchableOpacity>
          </Image>
        </View>
      </Modal>
    );
  }
}
