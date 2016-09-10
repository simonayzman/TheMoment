import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import TheMoment from './TheMoment';

export default class TheMomentApp extends Component {

  constructor() {
    super();
    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <TheMoment {...this.props} />
      </Provider>
    );
  }
}
