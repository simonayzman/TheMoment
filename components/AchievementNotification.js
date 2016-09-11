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
  achievementContainer: {
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'IowanOldStyle-Bold',
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'IowanOldStyle-Bold',
    color: 'white',
  }
});

export default class AchievementNotification extends Component {

  static propTypes = {
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string
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
          this.props.onDismiss();
        }
      },
    });
  }

  render() {
    const isBreaking = this.props.type === BREAKING;
    const bgColor = isBreaking ? '#BA232B' : '#272A35';
    return (
      <View
        style={[styles.container, { backgroundColor: this.props.backgroundColor }]}
        {...this.panResponder.panHandlers}
      >
        <Text>
          {this.props.title}
        </Text>
        <Text style={styles.notification}>
          {this.props.subtitle}
        </Text>
      </View>
    );
  }
}
