
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
    color: '#9D99B1',
    fontFamily:'Avenir-Light',
    fontSize: 25,
  },
  dontThinkAboutTitleView: {
    width: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#9D99B1',
  },
  dontThinkAboutSubtitleText: {
    color: 'white',
    fontFamily:'Avenir',
    fontSize: 40,
  },
  centerContainer: {
    position: 'absolute',
    top: (SCREEN_HEIGHT - LIVE_BUTTON_SIZE) / 2 + 100,
    left: (SCREEN_WIDTH - LIVE_BUTTON_SIZE) / 2,
  },
  liveCircle: {
    // backgroundColor: '#439cba',
    width: LIVE_BUTTON_SIZE,
    height: LIVE_BUTTON_SIZE/2,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: "rgb(156,148,178)",
    borderColor: "rgb(156,148,178)",
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    // shadowColor: "#000000",
    // shadowOpacity: 0.8,
    // shadowRadius: 5,
    // shadowOffset: {
      // height: 1,
      // width: 0
    // }
  },
  notReadyLiveCircle: {
    borderColor: "rgb(156,148,178)",
  },
  readyLiveCircle: {
    borderColor: "rgb(255,111,0	)",
  },
  liveText: {
    // color: '#18309d',
    color: "rgb(156,148,178)",
    fontSize: 72,
    fontFamily: 'Avenir',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  readyLiveText: {
    backgroundColor: 'rgba(0,0,0,0)',
    // color: '#18309d',
    color: "rgb(255,111,0	)",
    // color: "rgb(156,148,178)",

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
  bottomBarImage: {
    width: 30,
    height: 30,
    padding: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  bg: { flex: 1, resizeMode: 'stretch'},
  bgwrap:{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }

});
