import { AsyncStorage } from 'react-native';
import { Cache } from 'react-native-cache';

var MomentCache = new Cache({
  namespace: 'TheMoment',
  policy: {
    maxEntries: 50000
  },
  backend: AsyncStorage,
});

export default MomentCache;
