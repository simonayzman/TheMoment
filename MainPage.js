import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Animated,
} from 'react-native';
import {
  Modal,
  Router,
  Scene,
} from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
const RouterWithRedux = connect()(Router);

import * as Animatable from 'react-native-animatable';
import TimerMixin from 'react-timer-mixin';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  liveButtonCircle: {
    backgroundColor: 'blue',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveButton: {
    color: 'white',
    fontSize: 18,
  },
  notReadyLiveButton: {
    color: 'gray',
    fontSize: 24,
  },
  readyLiveButton: {
    color: 'red',
    fontSize: 36,
  }
});


class MainPage extends Component {

/*
  static propTypes = {
    actions: PropTypes.shape({
      fetchSearchLandingPageNavigationItems: PropTypes.func.isRequired,
    }).isRequired,
  };
*/

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
      liveButtonStyle: styles.notReadyLiveButton,
    };
  }

/*
  this.state.bounceValue.setValue(1.5);  // Start large
Animated.spring(  // Base: spring, decay, timing
this.state.bounceValue,  // Animate `bounceValue`
{ toValue: 0.8,  // Animate to smaller size
friction: 1,  // Bouncier spring
} ).start();

<Animated.Text  // Base: Image, Text, View
  style={{ transform: [{
    scale: this.state.bounceValue,
  }]}}
>
  LIVE!
</Animated.Text

Animated.sequence([  // spring to start and twirl after decay finishes
  Animated.decay(position, {  // coast to a stop
    velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
    deceleration: 0.997, }),
  Animated.parallel([  // after decay, in parallel:
    Animated.spring(position, { toValue: {x: 0, y: 0} }),
    Animated.timing(twirl, { toValue: 360, }), ]),
  ])
  .start();
*/

  componentDidMount() {

    /*
    if (this.throttleTimeoutID) {
      this.clearTimeout(this.throttleTimeoutID); // Clear previous timer that would fire request
    }
    this.readyToPressTimeoutID = this.setTimeout(
      () => {
        const hasQueryText = text.length > 0;

        if (hasQueryText) {
          this.props.onQuery(text);
        } else if (this.props.onClear) {
          this.props.onClear();
        }

        this.setState({ hasQueryText });
      },
      this.props.queryThrottle
    );
    */
  }

  onRestartTransition = () => {

  }

  onFillTransition = () => {
    this.setState({
      liveButtonStyle: styles.readyLiveButton,
    });
  }

  onReadyTransition = () => {

  }

  onPressedTransition = () => {

  }

/*
<Animatable.Text
  ref="liveButton"
  style={styles.liveButton}
  animation="pulse"
  easing="ease-out"
  iterationCount="infinite"
>
  LIVE!
</Animatable.Text>
*/

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.onFillTransition}>
          <View style={styles.liveButtonCircle}>
            <Animated.Text style={styles.liveButton}>
              LIVE!
            </Animated.Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }


}

Object.assign(MainPage.prototype, TimerMixin);

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(null, mapDispatchToProps)(MainPage);
