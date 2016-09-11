import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

const stories = [
  {
    description: "Living in the moment! Thanks Tide!",
    image: require('../assets/stories/surfing.png'),
    timePassed: "7m",
    name:"Sarah G.",
  },
  {
    description: "Living in the moment! Thanks Tide!",
    image: require('../assets/stories/wedding.png'),
    timePassed: "2h",
    name:"Kim S.",
  },
  {
    description: "Living in the moment! Thanks Tide!",
    image: require('../assets/stories/beach.png'),
    timePassed: "6h",
    name:"Jess H.",
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#131B33',
  },
  h2: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontFamily:'Avenir',
    color: 'white',
  },
  title: {
    borderBottomWidth: 2,
    borderBottomColor: '#A2A0A7',
  },
  row: {
    flexDirection: "row",
  },
  description: {
    fontFamily:'Avenir-Light',
    color: 'white',
    flex: 7.5,
    paddingLeft: 20,
  },
  timePassed: {
    fontFamily:'Avenir-Light',
    color: 'white',
    flex: 1,
  },
  name: {
    fontFamily:'Avenir',
    color: 'white',
    flex: 1.5,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20
  },
  image: {
    width: 375,
    height: 200,
    margin: 20
  }
});

export default class StoryPage extends Component {
  onPress(e, item){
    console.log('PRESSED',e, item)
  }
  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.title}>
          <Text style={styles.h2}>
            {'Stories'.toUpperCase()}
          </Text>
        </View>

        {stories.map((item, i)=> {
          return(
            <TouchableOpacity key={i}>
              <Image style={styles.image} source={item.image} />
              <View style={styles.row}>
                <Text style={styles.description}>&rdquo;{item.description}&rdquo;</Text>
                <Text style={styles.timePassed}>{item.timePassed}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}
