import MomentCache from '../lib/MomentCache';
import constants from '../lib/constants';
const {
  UPDATE_MOMENTS_FROM_CACHE,
  LIVE_IN_THE_MOMENT,
  RESET_MOMENTS,
  BULK_ADD_MOMENTS,
} = constants;

const initialState = {
  count: 0,
};

function updateMomentCount(momentCount) {
  MomentCache.setItem('momentCount', momentCount, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

export default function moment(state = initialState, action) {
  let newMomentCount;
  switch (action.type) {

    case UPDATE_MOMENTS_FROM_CACHE:
      return { ...state, count: action.momentCount };

    case LIVE_IN_THE_MOMENT:
      newMomentCount = state.count+1;
      updateMomentCount(newMomentCount);
      return { ...state, count: newMomentCount };

    case RESET_MOMENTS:
      newMomentCount = 0;
      updateMomentCount(newMomentCount);
      return { ...state, count: newMomentCount };

    case BULK_ADD_MOMENTS:
      newMomentCount = state.count+100;
      updateMomentCount(newMomentCount);
      return { ...state, count: newMomentCount };

    default:
      return state;
  }
}
