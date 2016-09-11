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
  Dimensions,
  PushNotificationIOS,
  LayoutAnimation,
} from 'react-native';
import keyMirror from 'keymirror';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import TimerMixin from 'react-timer-mixin';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';

import momentShop from '../assets/moment-shop.png';
import getRandomDontThink from '../data/dontThink';
import getAchievementForMomentCount from '../data/achievements';

import MomentNotification from './MomentNotification';

const VIBRATION_INTERVAL = 5000;
const LIVE_INTERVAL = 1000;

import {main_styles} from "../lib/styles"

const styles = main_styles

const MomentNotificationType = keyMirror({
  NONE: null,
  COME_BACK: null,
  ACHIEVEMENT_GREEN: null,
  ACHIEVEMENT_ORANGE: null,
});

const TopMessageType = keyMirror({
  WELCOME: null,
  DONT_THINK: null,
});

class MainPage extends Component {
  static propTypes = {
    momentCount: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      updateMomentsFromCache: PropTypes.func.isRequired,
      liveInTheMoment: PropTypes.func.isRequired,
      resetMoments: PropTypes.func.isRequired,
      bulkAddMoments: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      momentNotificationType: MomentNotificationType.NONE,
      topMessageType: TopMessageType.WELCOME,
      liveCircleStyle: [styles.liveCircle, styles.readyLiveCircle],
      liveText: [styles.liveText, styles.readyLiveText],
      isReady: true,
    };
    this.liveGrowValue = new Animated.Value(1);
    this.momentCountGrowValue = new Animated.Value(1);
  }

  componentWillMount() {
    PushNotificationIOS.addEventListener('register', this.onRegistered);
    PushNotificationIOS.addEventListener('notification', this.onRemoteNotification);
    PushNotificationIOS.addEventListener('localNotification', this.onLocalNotification);
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.cancelAllLocalNotifications();
  }

  componentWillReceiveProps(props) {
    const { momentCount } = props;
    LayoutAnimation.spring();

    // Rules for annoying stuff
    if (momentCount == 0) {
      return;
    }
    if (momentCount === 1) {
      this.showFirstMomentAlert();
    }
    if (momentCount % 3 == 0) {
      this.setState({
        topMessageType: TopMessageType.DONT_THINK,
        dontThink: getRandomDontThink(),
      });
    }
    let achievement = getAchievementForMomentCount(momentCount);
    if (achievement) {
      this.showIntervalMomentsAlert(momentCount, achievement);
    }
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
    PushNotificationIOS.removeEventListener('register', this.onRegistered);
    PushNotificationIOS.removeEventListener('notification', this.onRemoteNotification);
    PushNotificationIOS.removeEventListener('localNotification', this.onLocalNotification);
    console.log('Unmounting the main page. Scheduling push notification');
    this.scheduleLiveInTheMomentNotification();
  }

  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert);
    this.props.actions.updateMomentsFromCache();
    this.scheduleNoLivingVibration();
  }

  sendNotification = () => {
    require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
      aps: {
        alert: 'Sample notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE',
      },
    });
  }

  sendLocalNotification = () => {
    require('RCTDeviceEventEmitter').emit('localNotificationReceived', {
      aps: {
        alert: 'Sample local notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE',
      },
    });
  }

  scheduleLiveInTheMomentNotification = () => {
    PushNotificationIOS.scheduleLocalNotification({
      fireDate: Date()+4000,
      alertBody: 'You\'re not living in the Moment!',
      alertAction: 'Live in the Moment',
      soundName: 'default',
      // category: ,
      // userInfo: ,
      applicationIconBadgeNumber: 0,
    });
  }

  onRegistered = (deviceToken) => {
    console.log("Device registered.");
    /*
    AlertIOS.alert(
      'Registered For Remote Push',
      `Device Token: ${deviceToken}`,
      [
        { text: 'Dismiss', onPress: null, }
      ],
    );
    */
  }

  onRemoteNotification = (notification) => {
    console.log("On remote notification.");
    /*
    AlertIOS.alert(
      'Push Notification Received',
      'Alert message: ' + notification.getMessage(),
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
    */
  }

  onLocalNotification = (notification) => {
    console.log("On local notification.");
    /*
    AlertIOS.alert(
      'Local Notification Received',
      'Alert message: ' + notification.getMessage(),
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
    */
  }

  scheduleNoLivingVibration = () => {
    if (this.vibrateTimeoutID) {
      this.clearInterval(this.vibrateTimeoutID); // Clear previous timer that would fire request
    }
    this.vibrateTimeoutID = this.setInterval(() => {
      Vibration.vibrate();
      MessageBarManager.showAlert({
        title: "You're not living in the Moment!",
        message: "LIVE IN THE MOMENT",
        alertType: 'error', // Looks like how we want it
      });
    }, VIBRATION_INTERVAL);
  }

  resetReadyLiveCircle = () => {
    if (this.resetReadyTimeoutID) {
      this.clearTimeout(this.resetReadyTimeoutID); // Clear previous timer that would fire request
    }
    this.resetReadyTimeoutID = this.setTimeout(() => {
      this.setState({
        liveCircleStyle: [styles.liveCircle, styles.readyLiveCircle],
        liveText: [styles.liveText, styles.readyLiveText],
        isReady: true,
      });
    }, LIVE_INTERVAL);
    this.setState({
      liveCircleStyle: [styles.liveCircle, styles.notReadyLiveCircle],
      liveText: [styles.liveText, styles.notReadyLiveText],
      isReady: false,
      start: false,
    });
    Animated.sequence([
      Animated.spring(this.liveGrowValue, { toValue: 0.7 }),
      Animated.timing(this.liveGrowValue, { toValue: 1.05, duration: LIVE_INTERVAL - 500 }),
      Animated.spring(this.liveGrowValue, { toValue: 1, friction: 1 }),
    ]).start();
  }

  updateMomentCounter = () => {
    Animated.sequence([
      Animated.spring(this.momentCountGrowValue, { toValue: 1.2, friction: 1}),
      Animated.spring(this.momentCountGrowValue, { toValue: 1, friction: 1}),
    ]).start();
  }

  liveInTheMoment = () => {
    if (this.state.isReady) {
      this.updateMomentCounter();
      this.resetReadyLiveCircle();
      this.scheduleNoLivingVibration();
      this.props.actions.liveInTheMoment();
    }
  }

  showFirstMomentAlert() {

    MessageBarManager.showAlert({
      title: 'Your first moment!',
      message: "You're well on your way to being in the moment.",
      alertType: 'success',
    });
    //this.setTimeout(() => { MessageBarManager.hideAlert(); }, 2500);
    /*
    this.setState({
      momentNotificationType: MomentNotificationType.ACHIEVEMENT_GREEN,
    });
    */
  }

  showIntervalMomentsAlert(momentCount, achievement) {

    MessageBarManager.showAlert({
      title: `Congratulations on living in ${momentCount} moments!`,
      message: achievement,
      alertType: 'warning', // Looks like how we want it
    });
    //this.setTimeout(() => { MessageBarManager.hideAlert(); }, 2500);
    /*
    this.setState({
      momentNotificationType: MomentNotificationType.ACHIEVEMENT_ORANGE,
    });
    */
  }

  // Perhaps not necessary if we can get MessageBarManager working
  renderMomentNotification() {
    if (this.state.momentNotificationType === MomentNotificationType.NONE) {
      return (
        <View />
      );
    }
    if (this.state.momentNotificationType === MomentNotificationType.COME_BACK) {
      return (
        <MomentNotification
          backgroundColor={'red'}
          textColor={'black'}
          title={'Come back!'}
          subtitle={"You're not living in the moment"}
        />
      );
    }
    if (this.state.momentNotificationType === MomentNotificationType.ACHIEVEMENT_GREEN) {
      return (
        <MomentNotification
          backgroundColor={'green'}
          textColor={'black'}
          title={'Congratulations!'}
          subtitle={`You've reached ${this.props.momentCount} moments!`}
        />
      );
    }
    if (this.state.momentNotificationType === MomentNotificationType.ACHIEVEMENT_ORANGE) {
      return (
        <MomentNotification
          backgroundColor={'orange'}
          textColor={'black'}
          title={'Congratulations!'}
          subtitle={`You've reached ${this.props.momentCount} moments!`}
        />
      );
    }
  }

  renderTopMessage() {
    if (this.state.topMessageType === TopMessageType.WELCOME) {
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
    else if (this.state.topMessageType === TopMessageType.DONT_THINK) {
      return (
        <View style={styles.topMessageContainer}>
          <Text style={[styles.topMessageTitleText, styles.dontThinkAboutTitleText]}>
            {"Don't Think About"}
          </Text>
          <Text style={[styles.topMessageSubtitleText, styles.dontThinkAboutSubtitleText]}>
            {this.state.dontThink}
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
      <View style={{flex: 1}}>
        <View style={styles.topLevelContainer}>
          {this.renderTopMessage()}
          {this.renderLive()}
          {this.renderBottomBar()}
        </View>
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
