import React, { StyleSheet, Text, View } from 'react-native'

import { aboutStyles } from '../../assets/styles/aboutStyles'

export default class TeamLuna extends React.Component {

  render () {
    return (
      <View style={styles.tabView}>
        <Text allowFontScaling={false} style={styles.title}>The Charlotte Light Rail app helps you:</Text>
        <Text allowFontScaling={false} style={styles.contentAbout}>Find the closest station</Text>
        <Text allowFontScaling={false} style={styles.contentAbout}>Get directions there, on foot, or by car</Text>
        <Text allowFontScaling={false} style={styles.contentAbout}>See when the next train is coming, better hurry!</Text>
        <Text allowFontScaling={false} style={styles.contentAbout}>Check out the full schedule too</Text>
        <Text allowFontScaling={false} style={styles.contentAbout}>See quick FAQ&apos;s about riding the rail</Text>
        <Text allowFontScaling={false} style={styles.madeby}>Made with 💙 by <Text allowFontScaling={false} style={styles.teamluna}>Team Luna</Text></Text>
      </View>
    )
  }
}

const styles = StyleSheet.create(aboutStyles)
