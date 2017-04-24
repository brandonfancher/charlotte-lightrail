import React from 'react';
import { Dimensions, Text, SegmentedControlIOS, StyleSheet, View } from 'react-native';
import { getScheduleDay } from '../../helpers/scheduleCalcs';
import { COLORS } from '../../assets/styles/constants';

const deviceScreen = Dimensions.get('window');


export default class ScheduleInfoHeader extends React.Component {

  static propTypes = {
    scheduleIndex: React.PropTypes.number.isRequired,
    scheduleValueHandler: React.PropTypes.func.isRequired,
    stationName: React.PropTypes.string.isRequired,
  }

  state = {
    scheduleIndex: getScheduleDay().index,
    scheduleValue: getScheduleDay().day,
  };

  render() {
    const { scheduleIndex, scheduleValueHandler, stationName } = this.props;
    return (
      <View style={styles.wrap}>
        <Text allowFontScaling={false} style={styles.title}>{stationName}</Text>
        <View style={styles.scheduleSelector}>
          <SegmentedControlIOS
            values={['Weekday', 'Saturday', 'Sunday']}
            selectedIndex={scheduleIndex}
            onChange={e => this.setState({ scheduleIndex: e.nativeEvent.selectedSegmentIndex })}
            onValueChange={value => scheduleValueHandler(value)}
            tintColor="white"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.verticalDividerLine,
    flex: 1,
    height: 74,
    width: deviceScreen.width,
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 9,
    marginBottom: 3,
    color: COLORS.primaryTextColor,
  },
  scheduleSelector: {
    width: 240,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
});
