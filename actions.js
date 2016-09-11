import constants from './constants';
const {
  LIVE_IN_THE_MOMENT,
  RESET_MOMENTS,
  BULK_ADD_MOMENTS,
} = constants;

function dispatchableActionCreator(type, actionData) {
  return (dispatch) => dispatch({ type, ...actionData });
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
