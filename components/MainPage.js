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
  Alert
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


const VIBRATION_INTERVAL = 5000;
const LIVE_INTERVAL = 1000;

import {main_page_styles} from "../lib/styles"
const styles = main_page_styles


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
      topMessageType: TopMessageType.WELCOME,
      liveCircleStyle: [styles.liveCircle, styles.readyLiveCircle],
      liveText: [styles.liveText, styles.readyLiveText],
      isReady: true,
    };
    this.liveGrowValue = new Animated.Value(1);
    this.momentCountGrowValue = new Animated.Value(1);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(props) {
    const { momentCount } = props;
    LayoutAnimation.spring();
    // TODO move to reducer
    // Rules for annoying stuff
    if (momentCount == 0) {
      return;
    }
    if (momentCount === 1) {
      this.showFirstMomentAlert();
    }
    if (momentCount % 3 == 0) {
      this.setState({
        dontThink: getRandomDontThink(),
      });
    }
    let achievement = getAchievementForMomentCount(momentCount);
    if (achievement) {
      this.showIntervalMomentsAlert(momentCount, achievement);
    }
  }

  componentWillUnmount() {
    // MessageBarManager.unregisterMessageBar();
  }

  componentDidMount() {
    // MessageBarManager.registerMessageBar(this.refs.alert);
    this.props.actions.updateMomentsFromCache();
    this.scheduleNoLivingVibration();
  }


  scheduleNoLivingVibration = () => {
    if (this.vibrateTimeoutID) {
      this.clearInterval(this.vibrateTimeoutID); // Clear previous timer that would fire request
    }
    this.vibrateTimeoutID = this.setInterval(() => {
      // only do this if we've already lived some moments
      if (this.props.momentCount<4){return}
      Vibration.vibrate();
      Alert.alert('Live in The Moment!',  "You don't seem to be living in The Moment right now.")
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
    this.setState({achievement_message:"You're well on your way to being in The Moment."})
    // MessageBarManager.showAlert({
    //   duration: 4000,
    //   title: 'Your first moment!',
    //   message: "You're well on your way to being in the moment.",
    //   position: 'bottom',
    //   animationType: 'SlideFromLeft',
    // });
  }

  showIntervalMomentsAlert(momentCount, achievement) {
    this.setState({achievement_message:achievement})
    // MessageBarManager.showAlert({
    //   title: `Congratulations on living in ${momentCount} moments!`,
    //   message: achievement,
    //   alertType: 'warning', // Looks like how we want it
    //   duration: 4000,
    // });


  }



  renderTopMessage() {
    console.log(this.props.momentCount)
    return (<View>
        <Text>{this.state.achievement_message}</Text>
      </View>)
    // if (this.state.topMessageType === TopMessageType.WELCOME) {
    //   return (
    //     <View style={styles.topMessageContainer}>
    //       <Text style={[styles.topMessageTitleText, styles.welcomeMessageText]}>
    //         Welcome to
    //       </Text>
    //       <Text style={[styles.topMessageSubtitleText, styles.welcomeMessageText]}>
    //         THE MOMENT
    //       </Text>
    //     </View>
    //   );
    // }
    // else if (this.state.topMessageType === TopMessageType.DONT_THINK) {
    //   return (
    //     <View style={styles.topMessageContainer}>
    //       <Text style={[styles.topMessageTitleText, styles.dontThinkAboutTitleText]}>
    //         {"Don't Think About"}
    //       </Text>
    //       <Text style={[styles.topMessageSubtitleText, styles.dontThinkAboutSubtitleText]}>
    //         {this.state.dontThink}
    //       </Text>
    //     </View>
    //   );
    // }
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
              {'MOMENTS: '}
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
      <View style={styles.bgwrap}><Image source={require('../assets/bg.jpg')} style={styles.bg} /></View>
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
