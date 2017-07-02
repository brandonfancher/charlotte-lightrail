import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, InteractionManager, Text, ScrollView, StyleSheet, View } from 'react-native';
import moment from 'moment';
import ScheduleInfoHeader from 'components/StationDetail/ScheduleInfoHeader';
import { blueStops } from 'helpers/config';
import { getScheduleDay } from 'helpers/scheduleCalcs';
import { COLORS } from 'assets/styles/constants';

const deviceScreen = Dimensions.get('window');

export default class ScheduleInfo extends React.Component {

  state = {
    scheduleIndex: getScheduleDay().index,
    scheduleValue: getScheduleDay().day,
  };

  setScheduleAlignment = () => {
    const { scheduleValue } = this.state;
    const currentDay = getScheduleDay().day;
    const setWrapperStyle = (ref, margin) => ref.setNativeProps({ style: { marginTop: margin } });

    if (this.inboundNext) { // If we have a node for the ref (if we're on the schedule for today)...
      this.inboundNext.measure((ox, oy, width, height, px, py) => { // get the Y offset for the inbound time...
        const inboundY = py;
        let outboundY;
        // eslint-disable-next-line
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

  // We call this when we want to scroll down programmatically
  performScroll = (y, animated) => {
    this.scheduleScrollView.scrollTo({ x: 0, y, animated });
  }

  getTrainTimes = (direction, days) => {
    const { activeStationIndex, stopCallout } = this.props.navigation.state.params;
    const currentDay = getScheduleDay().day;
    const stop = blueStops[activeStationIndex];
    const schedule = `${direction}${days}`;
    const filteredStops = stop[schedule].filter(time => time !== 'no stop');

    const nextTime = (index, time) => (
      <View style={styles.tableCell}>
        {direction === 'outbound' &&
          <View style={styles.nextCircleWrapper}>
            <View style={[styles.horizontalLine, styles.horizontalLineInsideLeft]} />
            <View style={[styles.horizontalLine, styles.horizontalLineInsideRight]} />
            <View style={styles.nextLabelCircleOuter}>
              <View style={styles.nextLabelCircle}>
                <Text allowFontScaling={false} style={styles.nextLabel}>NEXT</Text>
              </View>
            </View>
          </View>
        }
        <View style={[styles.horizontalLine, direction === 'outbound' ? styles.horizontalLineOutsideRight : styles.horizontalLineOutsideLeft]} />
        <Text allowFontScaling={false} key={`${schedule}-${index}-entry-active`} ref={(c) => { this[`${direction}Next`] = c; }} style={styles.nextTime}>{time}</Text>
      </View>
    );

    const otherTime = (index, time) => (
      <View style={styles.tableCell}>
        <Text allowFontScaling={false} key={`${schedule}-${index}-entry-inactive`} style={styles.desc}>{time}</Text>
      </View>
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
      <ScrollView style={styles.tableColScrollView} ref={(c) => { this.scheduleScrollView = c; }}>
        <View style={styles.table}>
          <View ref={(c) => { this.inboundWrapper = c; }} style={[styles.tableCol, styles.tableColInbound]}>
            {this.getTrainTimes('inbound', days)}
          </View>
          <View ref={(c) => { this.outboundWrapper = c; }} onLayout={this.setScheduleAlignment} style={[styles.tableCol, styles.tableColOutbound]}>
            {this.getTrainTimes('outbound', days)}
          </View>
        </View>
      </ScrollView>
    );
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
        <View style={styles.wrap}>
          <View>
            <ScheduleInfoHeader
              scheduleIndex={scheduleIndex}
              scheduleValueHandler={this.scheduleValueHandler}
              stationName={blueStops[activeStationIndex].title}
            />
            <View style={styles.verticalLine} />
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableHead}>
              <View style={[styles.tableColHead, { borderRightWidth: 1, borderLeftWidth: 1 }]}>
                <Text allowFontScaling={false} style={[styles.bold, styles.whiteText, { fontSize: 15, paddingBottom: 2 }]}>Inbound</Text>
                <Text allowFontScaling={false}>
                  <Text allowFontScaling={false} style={styles.grayText}>I-485</Text>
                  <Text allowFontScaling={false} style={styles.grayText}> ➔ </Text>
                  <Text allowFontScaling={false} style={styles.grayText}>Uptown</Text>
                </Text>
              </View>
              <View style={styles.tableColHead}>
                <Text allowFontScaling={false} style={[styles.bold, styles.whiteText, { fontSize: 15, paddingBottom: 2 }]}>Outbound</Text>
                <Text allowFontScaling={false}>
                  <Text allowFontScaling={false} style={styles.grayText}>Uptown</Text>
                  <Text allowFontScaling={false} style={styles.grayText}> ➔ </Text>
                  <Text allowFontScaling={false} style={styles.grayText}>I-485</Text>
                </Text>
              </View>
            </View>
            {this.getSchedule()}
          </View>
        </View>
      );
    }
    return <View />;
  }
}

// Number calculations for styles
const insideColPadding = deviceScreen.width * 0.13;
const circleWrapperHeight = 54;
const circleWidth = 40;

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  // Table
  tableContainer: {
    flex: 1,
  },
  table: {
    flexDirection: 'row',
    backgroundColor: COLORS.transparent,
    paddingBottom: 10,
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundColor,
  },

  // Table Columns
  tableCol: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  tableColInbound: {
    alignItems: 'flex-end',
    paddingRight: insideColPadding,
  },
  tableColOutbound: {
    alignItems: 'flex-start',
    paddingLeft: insideColPadding,
  },
  tableColHead: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 16,
    paddingTop: 12,
    marginTop: 10,
    borderLeftColor: COLORS.transparent,
    borderRightColor: COLORS.verticalDividerLine,
    borderStyle: 'solid',
  },
  tableColScrollView: {
    backgroundColor: COLORS.backgroundColor
  },

  // Table cells
  tableCell: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  nextTime: {
    color: COLORS.highlightTextColor,
    fontSize: 20,
  },
  desc: {
    color: COLORS.primaryTextColor,
  },

  // Next Times Indicator
  nextLabel: {
    backgroundColor: COLORS.transparent,
    color: COLORS.highlightTextColor,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextLabelCircleOuter: {
    position: 'absolute',
    backgroundColor: COLORS.backgroundColor,
    height: circleWrapperHeight,
    paddingVertical: 7,
  },
  nextLabelCircle: {
    justifyContent: 'center',
    borderColor: COLORS.highlightTextColor,
    borderStyle: 'solid',
    borderWidth: 1,
    height: circleWidth,
    width: circleWidth,
    borderRadius: circleWidth / 2,
  },
  nextCircleWrapper: {
    position: 'relative',
    right: insideColPadding + 10 + (circleWidth / 2),
    bottom: ((circleWrapperHeight - 24) / 2) - 2, // (24 is the height of the next time view) / 2 - 2 (a visual adjustment)
  },
  horizontalLine: {
    position: 'relative',
    borderColor: COLORS.highlightTextColor,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    width: insideColPadding,
  },
  horizontalLineInsideLeft: {
    top: (circleWrapperHeight / 2) + 1,
    right: insideColPadding - (circleWidth / 2),
  },
  horizontalLineInsideRight: {
    top: circleWrapperHeight / 2,
    left: (circleWidth / 2),
  },
  horizontalLineOutsideLeft: {
    position: 'absolute',
    top: (24 / 2) + 1,
    left: -100,
    width: 100,
  },
  horizontalLineOutsideRight: {
    position: 'absolute',
    top: (24 / 2) + 3,
    right: -100,
    width: 100,
  },

  // General
  bold: {
    fontWeight: 'bold',
  },
  whiteText: {
    color: COLORS.primaryTextColor,
  },
  grayText: {
    color: COLORS.grayText,
  },
  verticalLine: {
    position: 'absolute',
    height: deviceScreen.height,
    left: deviceScreen.width / 2,
    borderRightColor: COLORS.verticalDividerLine,
    borderRightWidth: 1,
    borderStyle: 'solid',
    width: 1,
  },
});

ScheduleInfo.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        activeStationIndex: PropTypes.number,
        loading: PropTypes.bool.isRequired,
        stopCallout: PropTypes.object,
      })
    })
  }),
};
