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

const stories = [
  {
    description: "Living in The Moment™! Thanks Tide!",
    image: require('../assets/stories/surfing.png'),
    timePassed: "7m",
    name:"Sarah G.",
  },
  {
    description: "Living in The Moment™! Thanks Raid!",
    image: require('../assets/stories/wedding.png'),
    timePassed: "2h",
    name:"Kim S.",
  },
  {
    description: "Living in The Moment™! Thanks Miralax!",
    image: require('../assets/stories/hillary.jpg'),
    timePassed: "6h",
    name:"Hill C.",
  },
  {
    description: "Living in The Moment™! Thanks Tropicana!",
    image: require('../assets/stories/beach.png'),
    timePassed: "13h",
    name:"Jenny L.",
  },
  {
    description: "Living in The Moment™! Thanks Viagra!",
    image: require('../assets/stories/bed.jpg'),
    timePassed: "14h",
    name:"Mark M.",
  },
  {
    description: "Living in The Moment™! Thanks Tide!",
    image: require('../assets/stories/pilot.jpg'),
    timePassed: "1d",
    name:"Bob B.",
  },
  {
    description: "Living in The Moment™! Thanks Tropicana!",
    image: require('../assets/stories/bus.jpg'),
    timePassed: "1d",
    name:"Jess H.",
  },
  {
    description: "Living in The Moment™! Thanks Miralax!",
    image: require('../assets/stories/students.jpg'),
    timePassed: "1d",
    name:"John S.",
  },
];

export default class StoryPage extends Component {
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
