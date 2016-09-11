import constants from './constants';
const {
  LIVE_IN_THE_MOMENT,
  RESET_MOMENTS,
  BULK_ADD_MOMENTS,
} = constants;

const initialState = {
  count: 0,
};

export default function moment(state = initialState, action) {
  let newMomentCount;
  switch (action.type) {

    case LIVE_IN_THE_MOMENT:
      newMomentCount = state.count+1;
      return { ...state, count: newMomentCount };

    case RESET_MOMENTS:
      newMomentCount = 0;
      return { ...state, count: newMomentCount };

    case BULK_ADD_MOMENTS:
      newMomentCount = state.count+100;
      return { ...state, count: newMomentCount };

    default:
      return state;
  }
}
