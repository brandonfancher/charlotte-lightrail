import React, { Dimensions, Text, SegmentedControlIOS, StyleSheet, View } from 'react-native'
import { getScheduleDay } from '../../helpers/config'
const deviceScreen = Dimensions.get('window')

export default class ScheduleInfoHeader extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      scheduleIndex: getScheduleDay().index,
      scheduleValue: getScheduleDay().day
    }
  }

  render () {
    // console.log('ScheduleInfoHeader rendered')
    const { scheduleIndex, scheduleValueHandler, stationName } = this.props
    return (
      <View style={styles.wrap}>
        <Text allowFontScaling={false} style={styles.title}>{stationName}</Text>
        <View style={styles.scheduleSelector}>
          <SegmentedControlIOS
            values={['Weekday', 'Saturday', 'Sunday']}
            selectedIndex={scheduleIndex}
            onChange={e => this.setState({ scheduleIndex: e.nativeEvent.selectedSegmentIndex })}
            onValueChange={value => scheduleValueHandler(value)}
            tintColor='white'
            />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'black',
    flex: 1,
    width: deviceScreen.width
  },
  center: {
    alignSelf: 'center'
  },
  bold: {
    fontWeight: 'bold',
    color: '#ffffff'
  },
  italic: {
    fontStyle: 'italic',
    color: '#ffffff'
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 9,
    marginBottom: 3,
    color: '#ffffff'
  },
  scheduleSelector: {
    width: 240,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 12
  }
})

ScheduleInfoHeader.propTypes = {
  scheduleIndex: React.PropTypes.number.isRequired,
  scheduleValueHandler: React.PropTypes.func.isRequired,
  stationName: React.PropTypes.string.isRequired
}
