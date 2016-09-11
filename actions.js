import MomentCache from './MomentCache';
import constants from './constants';
const {
  UPDATE_MOMENTS_FROM_CACHE,
  LIVE_IN_THE_MOMENT,
  RESET_MOMENTS,
  BULK_ADD_MOMENTS,
} = constants;

function dispatchableActionCreator(type, actionData) {
  return (dispatch) => dispatch({ type, ...actionData });
}

export function updateMomentsFromCache() {
  return (dispatch) => {
    MomentCache.getItem('momentCount', (error, value) => {
      if (error) {
        console.log(error);
      } else {
        let momentCount = value || 0;
        dispatch(dispatchableActionCreator(UPDATE_MOMENTS_FROM_CACHE, { momentCount }));
      }
    });
  };
}

export function liveInTheMoment() {
  return dispatchableActionCreator(LIVE_IN_THE_MOMENT);
}

export function resetMoments() {
  return dispatchableActionCreator(RESET_MOMENTS);
}

export function bulkAddMoments() {
  return dispatchableActionCreator(BULK_ADD_MOMENTS);
}

// example thunk usage
export function exampleAction() {
  return (dispatch, getState) => {
    dispatch(dispatchableActionCreator("ANOTHER_ACTION"), { exampleData: 1});
  };
}
