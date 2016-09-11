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
} from 'react-native';
import keyMirror from 'keymirror';

const styles = StyleSheet.create({
  notificationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 80,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 30,
    fontFamily: 'IowanOldStyle-Bold',
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'IowanOldStyle-Bold',
    color: 'white',
  }
});

export default class MomentNotification extends Component {

  static propTypes = {
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    onPress: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
  };

  static defaultProps = {
    backgroundColor: "green",
    textColor: "white",
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onShouldBlockNativeResponder: () => true,

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.vy < 0) {
          console.log("dismissing");
          if (this.props.onDismiss) {
            this.props.onDismiss();
          }
        }
      },
    });
  }

  render() {
    return (
      <View
        style={[styles.notificationContainer, { backgroundColor: this.props.backgroundColor }]}
        {...this.panResponder.panHandlers}
      >
        <Text style={[styles.title, { color: this.props.textColor }]}>
          {this.props.title}
        </Text>
        <Text style={[styles.subtitle, { color: this.props.textColor }]}>
          {this.props.subtitle}
        </Text>
      </View>
    );
  }
}
