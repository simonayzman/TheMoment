import constants from './constants';
const {
  LIVE_IN_THE_MOMENT,
} = constants;

function dispatchableActionCreator(type, actionData) {
  return (dispatch) => dispatch({ type, ...actionData });
}

export function liveInTheMoment() {
  return dispatchableActionCreator(LIVE_IN_THE_MOMENT);
}

// example thunk usage
export function exampleAction() {
  return (dispatch, getState) => {
    dispatch(dispatchableActionCreator("ANOTHER_ACTION"), { exampleData: 1});
  };
}
