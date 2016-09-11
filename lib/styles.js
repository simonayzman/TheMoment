
import {
  StyleSheet,

  Dimensions,
  PushNotificationIOS,
  LayoutAnimation,
} from 'react-native';



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const LIVE_BUTTON_SIZE = 250;

export const main_styles = StyleSheet.create({
  topLevelContainer: {
    flex: 1,
    backgroundColor: '#ffffe6',
    justifyContent: 'space-between',
  },
  topMessageContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  topMessageTitleText: {
    fontSize: 40,
    fontFamily: 'IowanOldStyle-Bold',
    textAlign: 'center',
  },
  topMessageSubtitleText: {
    fontSize: 45,
    fontFamily: 'IowanOldStyle-Bold',
    textAlign: 'center',
  },
  welcomeMessageText: {
    color: '#18309d',
  },
  dontThinkAboutTitleText: {
    color: 'red',
  },
  dontThinkAboutSubtitleText: {
    color: '#18309d',
  },
  centerContainer: {
    position: 'absolute',
    top: (SCREEN_HEIGHT - LIVE_BUTTON_SIZE) / 2 + 100,
    left: (SCREEN_WIDTH - LIVE_BUTTON_SIZE) / 2,
  },
  liveCircle: {
    backgroundColor: '#439cba',
    width: LIVE_BUTTON_SIZE,
    height: LIVE_BUTTON_SIZE,
    borderRadius: LIVE_BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  notReadyLiveCircle: {
    backgroundColor: '#ff0000',
  },
  readyLiveCircle: {
    backgroundColor: '#439cba',
  },
  liveText: {
    color: '#18309d',
    fontSize: 80,
    fontFamily: 'IowanOldStyle-Bold',
    textAlign: 'center',
  },
  readyLiveText: {
    color: '#18309d',
  },
  notReadyLiveText: {
    color: '#dddddd',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  momentsCounterContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  momentsCounterText: {
    fontSize: 30,
    color: '#18309d',
    fontFamily: 'IowanOldStyle-Bold',
  },
  momentsCounterNumberText: {
    fontSize: 30,
    color: '#18309d',
    textAlign: 'left',
    fontFamily: 'IowanOldStyle-Bold',
  },
  momentShopContainer: {
    justifyContent: 'center',
  },
  momentShopImage: {
    width: 65,
    height: 65,
    padding: 5,
  },
});
