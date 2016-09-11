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
import * as actions from '../redux/actions';

import MainPage from './MainPage';
import PurchaseStore from './PurchaseStore';

const RouterWithRedux = connect()(Router);

class TheMoment extends Component {

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root">
          <Scene key={'mainPage'} component={MainPage} title='Live in the Moment!' hideNavBar initial/>
          <Scene key={'storePage'} component={PurchaseStore} title="Shop in the Moment!" hideNavBar={false} />
        </Scene>
      </RouterWithRedux>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(null, mapDispatchToProps)(TheMoment);
