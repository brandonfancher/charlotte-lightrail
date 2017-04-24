import React, { View, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

export const BackToMapButton = () =>
  <View style={styles.container}>
    <Button containerStyle={styles.closeButtonContainer} style={styles.closeButton} onPress={Actions.home}>Back to Map</Button>
  </View>

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.01)'
  },
  closeButton: {
    color: 'navy'
  },
  closeButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'navy',
    height: 40,
    marginBottom: 16,
    marginHorizontal: 20,
    marginTop: 14,
    overflow: 'hidden',
    paddingVertical: 8
  }
})
