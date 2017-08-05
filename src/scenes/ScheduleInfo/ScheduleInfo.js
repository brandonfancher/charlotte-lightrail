import React from 'react';
import PropTypes from 'prop-types';
import { InteractionManager, Text, View } from 'react-native';
import moment from 'moment';
import ScheduleInfoHeader from 'components/ScheduleInfoHeader';
import { blueStops } from 'helpers/config';
import { getScheduleDay } from 'helpers/scheduleCalcs';
import { deviceProps } from 'helpers/device';
import {
  BoldWhiteText, DescriptionText, GrayText, TableCellView,
  HorizontalLineInsideLeftView, HorizontalLineInsideRightView,
  HorizontalLineOutsideLeftView, HorizontalLineOutsideRightView,
  NextCircleWrapperView, NextLabelCircleOuterView, NextLabelText,
  NextLabelCircleView, NextTimeText, TableColHeadView, WrapView,
  TableColInboundView, TableColOutboundView, TableColScrollView,
  TableContainerView, TableHeadView, TableView, VerticalLineView
} from './ScheduleInfoCss';

const { deviceScreen } = deviceProps;

export default class ScheduleInfo extends React.Component {

  state = {
    scheduleIndex: getScheduleDay().index,
    scheduleValue: getScheduleDay().day
  };

  setScheduleAlignment = () => {
    const { scheduleValue } = this.state;
    const currentDay = getScheduleDay().day;
    const setWrapperStyle = (ref, margin) => ref.setNativeProps({ style: { marginTop: margin } });

    if (this.inboundNext) { // If we have a node for the ref (if we're on the schedule for today)...
      this.inboundNext.measure((ox, oy, width, height, px, py) => { // get the Y offset for the inbound time...
        const inboundY = py;
        let outboundY;
        this.outboundNext.measure((ox, oy, width, height, px, py) => { // get the Y offset for the outbound time...
          outboundY = py;
          const offset = inboundY - outboundY; // calculate the Y offset)...
          const scrollPosition = Math.max(inboundY, outboundY) - (deviceScreen.height / 2); // calculate scroll positions...

          // schedule the scroll to happen after the navigator scene finishes sliding in...
          InteractionManager.runAfterInteractions(() => this.performScroll(scrollPosition, true));

          // and apply our column offset!
          if (offset > 0 && scheduleValue === currentDay) {
            setWrapperStyle(this.outboundWrapper, offset);
          } else if (offset <= 0 && scheduleValue === currentDay) {
            setWrapperStyle(this.inboundWrapper, Math.abs(offset));
          }
        });
      });
    } else {
      // If we go to a schedule for a day other than today, reset the alignment of all cols back to top.
      setWrapperStyle(this.outboundWrapper, 0);
      setWrapperStyle(this.inboundWrapper, 0);
    }
  }

  getTrainTimes = (direction, days) => {
    const { activeStationIndex, stopCallout } = this.props.navigation.state.params;
    const currentDay = getScheduleDay().day;
    const stop = blueStops[activeStationIndex];
    const schedule = `${direction}${days}`;
    const filteredStops = stop[schedule].filter(time => time !== 'no stop');

    const nextTime = (index, time) => (
      <TableCellView>
        {direction === 'outbound' &&
          <NextCircleWrapperView>
            <HorizontalLineInsideLeftView />
            <HorizontalLineInsideRightView />
            <NextLabelCircleOuterView>
              <NextLabelCircleView>
                <NextLabelText allowFontScaling={false}>NEXT</NextLabelText>
              </NextLabelCircleView>
            </NextLabelCircleOuterView>
          </NextCircleWrapperView>
        }
        {direction === 'outbound' ?
          <HorizontalLineOutsideRightView />
          :
          <HorizontalLineOutsideLeftView />
        }
        <NextTimeText allowFontScaling={false} key={`${schedule}-${index}-entry-active`} innerRef={(c) => { this[`${direction}Next`] = c; }}>{time}</NextTimeText>
      </TableCellView>
    );

    const otherTime = (index, time) => (
      <TableCellView>
        <DescriptionText allowFontScaling={false} key={`${schedule}-${index}-entry-inactive`}>{time}</DescriptionText>
      </TableCellView>
    );

    return filteredStops
      .map(time => moment(time, 'HH:mm').format('LT'))
      .map((time, index) =>
        <View key={`${schedule}-${index}`}>
          {(stopCallout[direction] && time === stopCallout[direction].time && days === currentDay)
            ? nextTime(index, time)
            : otherTime(index, time)
          }
        </View>
      );
  }

  getSchedule = () => {
    const days = this.state.scheduleValue;
    return (
      <TableColScrollView innerRef={(c) => { this.scheduleScrollView = c; }}>
        <TableView>
          <TableColInboundView innerRef={(c) => { this.inboundWrapper = c; }}>
            {this.getTrainTimes('inbound', days)}
          </TableColInboundView>
          <TableColOutboundView innerRef={(c) => { this.outboundWrapper = c; }} onLayout={this.setScheduleAlignment}>
            {this.getTrainTimes('outbound', days)}
          </TableColOutboundView>
        </TableView>
      </TableColScrollView>
    );
  }

  // We call this when we want to scroll down programmatically
  performScroll = (y, animated) => {
    this.scheduleScrollView.scrollTo({ x: 0, y, animated });
  }

  scheduleValueHandler = (value) => {
    this.setState({ scheduleValue: value });
    this.performScroll(0, false); // If we switch schedules, reset scroll position to top
  }

  render() {
    // console.log('ScheduleInfo rendered')
    const { scheduleIndex } = this.state;
    const { activeStationIndex, loading, stopCallout } = this.props.navigation.state.params;

    if (activeStationIndex !== null && stopCallout && !loading) {
      return (
        <WrapView>
          <View>
            <ScheduleInfoHeader
              scheduleIndex={scheduleIndex}
              scheduleValueHandler={this.scheduleValueHandler}
              stationName={blueStops[activeStationIndex].title}
            />
            <VerticalLineView />
          </View>
          <TableContainerView>
            <TableHeadView>
              <TableColHeadView borderRightWidth borderLeftWidth>
                <BoldWhiteText allowFontScaling={false}>Inbound</BoldWhiteText>
                <Text allowFontScaling={false}>
                  <GrayText allowFontScaling={false}>I-485</GrayText>
                  <GrayText allowFontScaling={false}> ➔ </GrayText>
                  <GrayText allowFontScaling={false}>Uptown</GrayText>
                </Text>
              </TableColHeadView>
              <TableColHeadView>
                <BoldWhiteText allowFontScaling={false}>Outbound</BoldWhiteText>
                <Text allowFontScaling={false}>
                  <GrayText allowFontScaling={false}>Uptown</GrayText>
                  <GrayText allowFontScaling={false}> ➔ </GrayText>
                  <GrayText allowFontScaling={false}>I-485</GrayText>
                </Text>
              </TableColHeadView>
            </TableHeadView>
            {this.getSchedule()}
          </TableContainerView>
        </WrapView>
      );
    }
    return <View />;
  }
}

ScheduleInfo.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        activeStationIndex: PropTypes.number,
        loading: PropTypes.bool.isRequired,
        stopCallout: PropTypes.object
      })
    })
  })
};
