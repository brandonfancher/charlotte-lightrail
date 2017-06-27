import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, SegmentedControlIOS } from 'react-native';
import { WrapView, TitleText, ScheduleSelectorView } from './ScheduleInfoHeaderCss';
import { getScheduleDay } from 'helpers/scheduleCalcs';

const deviceScreen = Dimensions.get('window');

export default class ScheduleInfoHeader extends React.Component {

  static propTypes = {
    scheduleIndex: PropTypes.number.isRequired,
    scheduleValueHandler: PropTypes.func.isRequired,
    stationName: PropTypes.string.isRequired,
  }

  state = {
    scheduleIndex: getScheduleDay().index,
    scheduleValue: getScheduleDay().day,
  };

  render() {
    const { scheduleIndex, scheduleValueHandler, stationName } = this.props;
    return (
      <WrapView width={deviceScreen.width}>
        <TitleText allowFontScaling={false}>{stationName}</TitleText>
        <ScheduleSelectorView>
          <SegmentedControlIOS
            values={['Weekday', 'Saturday', 'Sunday']}
            selectedIndex={scheduleIndex}
            onChange={e => this.setState({ scheduleIndex: e.nativeEvent.selectedSegmentIndex })}
            onValueChange={value => scheduleValueHandler(value)}
            tintColor="white"
          />
        </ScheduleSelectorView>
      </WrapView>
    );
  }
}
