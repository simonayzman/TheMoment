import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Modal,
  Router,
  Scene,
} from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

import MainPage from './MainPage';

const RouterWithRedux = connect()(Router);

class TheMoment extends Component {

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root">
          <Scene key={'mainPage'} component={MainPage} title='Live in the Moment!' initial hideNavBar/>
          <Scene key={'storePage'} component={MainPage} title="Shop in the Moment!" />
        </Scene>
      </RouterWithRedux>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(null, mapDispatchToProps)(TheMoment);
