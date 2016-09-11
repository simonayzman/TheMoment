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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';

import momentShop from '../assets/cart-icon.png';
import storyPage from '../assets/people-icon.png';
import {dontThinkList} from '../data/dontThink';
import getAchievementForMomentCount from '../data/achievements';


const VIBRATION_INTERVAL = 8000;
const LIVE_INTERVAL = 3000;

import {main_page_styles} from "../lib/styles"
const styles = main_page_styles


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
      dontThinkIndex: -1,
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
    // Rules for annoying stuff
    if (momentCount == 0) {
      return;
    }
    if (momentCount % 3 == 0) {
      this.setState({
        dontThinkIndex: this.state.dontThinkIndex+1,
        dontThink: dontThinkList[this.state.dontThinkIndex+1],
      });
    }
    else {
      this.setState({ dontThink: ''});
    }
    let achievement = getAchievementForMomentCount(momentCount);
    if (achievement) {
      this.setState({achievement_title:achievement, achievement_message:`Congratulations on living in ${momentCount} moments!` })
    }
    else if (momentCount>1) {
      this.setState({achievement_message:'', achievement_title:'' })
    }
  }

  componentWillUnmount() {
    this.clearTimeout(this.resetReadyTimeoutID)
  }

  componentDidMount() {
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


  renderTopMessage() {
    let ach_bar = (this.state.achievement_message ? <View style={styles.topMessageContainer}>
        <Text style={styles.topMessageTitleText}>🏆 {this.state.achievement_title}</Text>
        <Text style={styles.topMessageSubtitleText}>{this.state.achievement_message}</Text>
      </View> : <View></View>)
    console.log(this.state.dontThink )
    var dontThink;
    if(this.state.dontThink){
      dontThink = (
        <View style={styles.topMessageContainer}>
          <Text style={[styles.topMessageTitleText, styles.dontThinkAboutTitleText]}>
            DON&#8217;T THINK ABOUT
          </Text>
          <View style={styles.dontThinkAboutTitleView}></View>
          <Text style={[styles.topMessageSubtitleText, styles.dontThinkAboutSubtitleText]}>
            {this.state.dontThink.toUpperCase()}
          </Text>
        </View>
      );
    } else {
      dontThink = (
        <View></View>
      );
    }
    return <View>{ach_bar}{dontThink}</View>
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
        <View style={styles.momentShopContainer}>
          <TouchableOpacity
            onPress={Actions.storyPage}
            onLongPress={this.props.actions.bulkAddMoments}
            delayLongPress={1000}
          >
            <Image
              style={styles.bottomBarImage}
              source={storyPage}
            />
          </TouchableOpacity>
        </View>
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
              style={styles.bottomBarImage}
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
