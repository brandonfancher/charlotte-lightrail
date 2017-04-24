import React, { View, StyleSheet } from 'react-native'

export default class Home extends React.Component {

  render () {
    return <View pointerEvents='box-none' style={styles.container} />
  }
}

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})
