import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Image,
  Vibration,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import TimerMixin from 'react-timer-mixin';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

import momentShop from './assets/moment-shop.png';

const styles = StyleSheet.create({
  topLevelContainer: {
    flex: 1,
    backgroundColor: '#ffffe6',
  },
  topMessageContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  topMessageTitleText: {
    fontSize: 40,
    fontFamily: 'IowanOldStyle-Bold',
    textAlign: 'center',
  },
  topMessageSubtitleText: {
    fontSize: 45,
    fontFamily: 'IowanOldStyle-Bold',
    textAlign: 'center',
  },
  welcomeMessageText: {
    color: '#18309d',
  },
  dontThinkAboutTitleText: {
    color: 'red',
  },
  dontThinkAboutSubtitleText: {
    color: '#18309d',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  liveCircle: {
    backgroundColor: '#439cba',
    width: 250,
    height: 250,
    borderRadius: 125,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  notReadyLiveCircle: {
    backgroundColor: '#ff0000',
  },
  readyLiveCircle: {
    backgroundColor: '#439cba',
  },
  liveText: {
    color: '#18309d',
    fontSize: 80,
    fontFamily: 'IowanOldStyle-Bold',
    textAlign: 'center',
  },
  readyLiveText: {
    color: '#18309d',
  },
  notReadyLiveText: {
    color: '#dddddd',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  momentsCounterContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  momentsCounterText: {
    fontSize: 30,
    color: '#18309d',
    fontFamily: 'IowanOldStyle-Bold',
  },
  momentsCounterNumberText: {
    fontSize: 30,
    color: '#18309d',
    textAlign: 'left',
    fontFamily: 'IowanOldStyle-Bold',
  },
  momentShopContainer: {
    justifyContent: 'center',
  },
  momentShopImage: {
    width: 50,
    height: 50,
    padding: 5,
  },
});


class MainPage extends Component {

  static propTypes = {
    momentCount: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      liveInTheMoment: PropTypes.func.isRequired,
      resetMoments: PropTypes.func.isRequired,
      bulkAddMoments: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      topMessageType: 'welcome',
      liveCircleStyle: [styles.liveCircle, styles.readyLiveCircle],
      liveText: [styles.liveText, styles.readyLiveText],
      isReady: true,
    };
    this.liveGrowValue = new Animated.Value(1);
    this.momentCountGrowValue = new Animated.Value(1);
  }

  componentDidMount() {
    // Register the alert located on this master page
    // This MessageBar will be accessible from the current (same) component, and from its child component
    // The MessageBar is then declared only once, in your main component.
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }

  onVibrationTimeout = () => {
    if (this.vibrateTimeoutID) {
      this.clearTimeout(this.vibrateTimeoutID); // Clear previous timer that would fire request
    }
    this.vibrateTimeoutID = this.setTimeout(Vibration.vibrate, 10000);
  }

  onResetReadyTimeout = () => {
    if (this.resetReadyTimeoutID) {
      this.clearTimeout(this.resetReadyTimeoutID); // Clear previous timer that would fire request
    }
    this.resetReadyTimeoutID = this.setTimeout(() => {
      this.setState({
        liveCircleStyle: [styles.liveCircle, styles.readyLiveCircle],
        liveText: [styles.liveText, styles.readyLiveText],
        isReady: true,
      });
    }, 2500);
  }

  onResetReadyLiveCircle = () => {
    this.onVibrationTimeout();
    this.onResetReadyTimeout();
    this.setState({
      liveCircleStyle: [styles.liveCircle, styles.notReadyLiveCircle],
      liveText: [styles.liveText, styles.notReadyLiveText],
      isReady: false,
      start: false,
    });
    Animated.sequence([
      Animated.spring(this.liveGrowValue, { toValue: 0.7 }),
      Animated.timing(this.liveGrowValue, { toValue: 1.05, duration: 2000 }),
      Animated.spring(this.liveGrowValue, { toValue: 1, friction: 1 }),
    ]).start();
  }

  liveInTheMoment = () => {
    if (this.state.isReady) {
      Animated.sequence([
        Animated.spring(this.momentCountGrowValue, { toValue: 1.2, friction: 1}),
        Animated.spring(this.momentCountGrowValue, { toValue: 1, friction: 1}),
      ]).start();
      this.onResetReadyLiveCircle();
      this.props.actions.liveInTheMoment();
      this.showFirstMomentAlert();
    }
  }

  showFirstMomentAlert() {
    MessageBarManager.showAlert({
      title: 'Your first moment!',
      message: "You're well on your way to being in the moment.",
      alertType: 'success',
    });
    this.setTimeout(() => { MessageBarManager.hideAlert(); }, 2500);
  }

  renderTopMessage() {
    if (this.state.topMessageType === 'welcome') {
      return (
        <View style={styles.topMessageContainer}>
          <Text style={[styles.topMessageTitleText, styles.welcomeMessageText]}>
            Welcome to
          </Text>
          <Text style={[styles.topMessageSubtitleText, styles.welcomeMessageText]}>
            THE MOMENT
          </Text>
        </View>
      );
    }
    else if (this.state.topMessageType === 'dontThinkAbout') {
      return (
        <View style={styles.topMessageContainer}>
          <Text style={[styles.topMessageTitleText, styles.dontThinkAboutTitleText]}>
            {"Don't Think About"}
          </Text>
          <Text type={[styles.topMessageSubtitleText, styles.dontThinkAboutSubtitleText]}>
            {"THE MOMENT"}
          </Text>
        </View>
      );
    }
  }

  renderLive() {
    return (
      <View style={styles.centerContainer}>
        <TouchableOpacity onPress={this.liveInTheMoment}>
          <Animated.View style={[this.state.liveCircleStyle, { transform: [{
              scale: this.liveGrowValue
            }]}]}
          >
            <Text style={this.state.liveText}>LIVE</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }

  renderBottomBar() {
    return (
      <View style={styles.bottomBar}>
        <TouchableWithoutFeedback
          onLongPress={this.props.actions.resetMoments}
          delayLongPress={1000}
        >
          <View style={styles.momentsCounterContainer}>
            <Text style={styles.momentsCounterText}>
              {'Moments: '}
            </Text>
            <Animated.Text
              style={[styles.momentsCounterNumberText, { transform: [{
                scale: this.momentCountGrowValue
              }]}]}
            >
              {this.props.momentCount}
            </Animated.Text>
            </View>
        </TouchableWithoutFeedback>
        <View style={styles.momentShopContainer}>
          <TouchableOpacity
            onPress={Actions.storePage}
            onLongPress={this.props.actions.bulkAddMoments}
            delayLongPress={1000}
          >
            <Image
              style={styles.momentShopImage}
              source={momentShop}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.topLevelContainer}>
        {this.renderTopMessage()}
        {this.renderLive()}
        {this.renderBottomBar()}
        <MessageBarAlert ref="alert"/>
      </View>
    );
  }

}

Object.assign(MainPage.prototype, TimerMixin);

function mapStateToProps(state) {
  return { momentCount: state.count };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
