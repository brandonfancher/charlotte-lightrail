import React, { StyleSheet, View, SegmentedControlIOS, Dimensions } from 'react-native'
import Faq from '../components/About/FAQ'
import TeamLuna from '../components/About/TeamLuna'
const deviceScreen = Dimensions.get('window')

export default class About extends React.Component {

  render () {
    return (
      <View style={styles.viewContainer}>
        {/* <View style={styles.wrap}>
          <View style={styles.scheduleSelector}>
            <SegmentedControlIOS
              values={['FAQs', 'About']}
              tintColor='white'
              />
          </View>
        </View> */}
        <Faq tabLabel='Rail FAQs' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    position: 'absolute',
    top: 64,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(1, 42, 60, 0.97)'
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    marginTop: 20
  },
  wrap: {
    paddingTop: 10,
    backgroundColor: 'black',
    width: deviceScreen.width
  },
  scheduleSelector: {
    backgroundColor: 'black',
    width: 240,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 10
  }
})

About.propTypes = {
}
