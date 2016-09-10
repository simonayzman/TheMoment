import constants from './constants';
const {
  LIVE_IN_THE_MOMENT,
} = constants;

const initialState = {
  moments: 0, // get actual number from persistent store?
};

export default function moment(state = initialState, action) {
  switch (action.type) {

    case LIVE_IN_THE_MOMENT:
      return { ...state, moments: state.moments+1 };

    default:
      return state;
  }
}
