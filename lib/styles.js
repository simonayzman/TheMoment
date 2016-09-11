
import {
  StyleSheet,

  Dimensions,
  PushNotificationIOS,
  LayoutAnimation,
} from 'react-native';



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const LIVE_BUTTON_SIZE = 250;

export const main_page_styles = StyleSheet.create({
  topLevelContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0)', // so text doesn't have a bg
  },
  topMessageContainer: {
    marginTop: 0,
    alignItems: 'center',
    backgroundColor: "rgb(23,21,68)",
    padding: 5
  },
  topMessageTitleText: {
    fontSize: 20,
    fontFamily: 'Avenir',
    textAlign: 'center',
    color: "white",
  },
  topMessageSubtitleText: {
    fontSize: 17,
    fontFamily: 'Avenir',
    textAlign: 'center',
    color: "white",

  },
  welcomeMessageText: {
    color: 'white',
  },
  dontThinkAboutTitleText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center'
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
    fontFamily: 'Avenir',
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
    color: 'rgb(134,127,153)',
    fontFamily: 'Avenir',
  },
  momentsCounterNumberText: {
    fontSize: 30,
    color: 'rgb(134,127,153)',
    textAlign: 'left',
    fontFamily: 'Avenir',
  },
  momentShopContainer: {
    justifyContent: 'center',
  },
  momentShopImage: {
    width: 65,
    height: 65,
    padding: 5,
  },
  bg: { flex: 1, resizeMode: 'stretch'},
  bgwrap:{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }

});
