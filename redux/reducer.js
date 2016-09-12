import MomentCache from '../lib/MomentCache';
import constants from '../lib/constants';
const {
  UPDATE_MOMENTS_FROM_CACHE,
  LIVE_IN_THE_MOMENT,
  RESET_MOMENTS,
  BULK_ADD_MOMENTS,
  PURCHASE_LUXURY_LIVE_BUTTON,
  DECREMENT_LUXURY_LIVE_BUTTON_LIFESPAN,
  DISABLE_LUXURY_LIVE_BUTTON,
} = constants;
import purchasables from '../data/purchasables';

const initialState = {
  count: 0,
  isLuxuryLiveButtonEnabled: false,
  luxuryLiveButtonLifespan: 0,
  purchasables,
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

    case PURCHASE_LUXURY_LIVE_BUTTON:
      const purchasedPurchasables = [ ...state.purchasables ];
      purchasedPurchasables[0].purchased = true;
      return {
        ...state,
        isLuxuryLiveButtonEnabled: true,
        luxuryLiveButtonLifespan: 2,
        count: state.count - action.price,
        purchasables: purchasedPurchasables,
     };

    case DECREMENT_LUXURY_LIVE_BUTTON_LIFESPAN:
      return { ...state, luxuryLiveButtonLifespan: state.luxuryLiveButtonLifespan-1 };

    case DISABLE_LUXURY_LIVE_BUTTON:
      const disabledPurchasables = [ ...state.purchasables ];
      disabledPurchasables[0].purchased = false;
      return {
        ...state,
        isLuxuryLiveButtonEnabled: false,
        purchasables: disabledPurchasables,
      };

    default:
      return state;
  }
}
