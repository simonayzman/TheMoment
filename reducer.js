import constants from './constants';
const {
  LIVE_IN_THE_MOMENT,
} = constants;

const initialState = {
  count: 0, // get actual number from persistent store?
};

export default function moment(state = initialState, action) {
  switch (action.type) {

    case LIVE_IN_THE_MOMENT:
      return { ...state, count: state.count+1 };

    default:
      return state;
  }
}
