import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { COLORS } from '../assets/styles/constants';

export default class StationDetail extends React.Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          activeCallout: PropTypes.object.isRequired,
          stop: PropTypes.object.isRequired,
        })
      })
    }),
  }

  renderStationFeatures = () => {
    const { stop } = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.featuresWrapper}>

        {stop.stationFeatures.map((feature, index) =>
          <View key={`feature-${index}`} style={styles.featuresContainer}>
            <View style={styles.iconImage}>
              <Image source={feature.icon} />
            </View>
            <View style={styles.featuresTextItem}>
              <Text allowFontScaling={false} style={styles.featuresText} key={`station-feature-${index}`}>{feature.featureDesc}</Text>
            </View>
          </View>
        )}

      </ScrollView>
    );
  }

  render() {
    const { activeCallout, stop } = this.props.navigation.state.params;
    const nextInboundTime = activeCallout.inbound.time;
    const nextInboundDelta = activeCallout.inbound.delta;
    const nextOutboundTime = activeCallout.outbound.time;
    const nextOutboundDelta = activeCallout.outbound.delta;

    return (
      <View style={styles.tabView}>
        <View style={styles.timesContainer}>
          <View style={styles.nextBlock}>
            <Text allowFontScaling={false} style={styles.smallText}>Next Inbound</Text>
            <Text allowFontScaling={false} style={[styles.nextTime, styles.bold]}>{nextInboundTime}</Text>
            <Text allowFontScaling={false} style={styles.smallText}>{nextInboundDelta}</Text>
          </View>
          <View style={styles.nextBlock}>
            <Text allowFontScaling={false} style={styles.smallText}>Next Outbound</Text>
            <Text allowFontScaling={false} style={[styles.nextTime, styles.bold]}>{nextOutboundTime}</Text>
            <Text allowFontScaling={false} style={styles.smallText}>{nextOutboundDelta}</Text>
          </View>
        </View>
        {stop.mapLabel && <Text allowFontScaling={false} style={styles.subtitle}>{stop.mapLabel}</Text>}
        <View style={{ flex: 1 }}>
          {this.renderStationFeatures()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    marginTop: 0,
    backgroundColor: COLORS.backgroundColor,
  },
  iconImage: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: COLORS.primaryTextColor,
  },
  smallText: {
    color: COLORS.primaryTextColor,
    fontSize: 13,
  },
  subtitle: {
    alignSelf: 'center',
    fontSize: 28,
    marginTop: 20,
    marginBottom: 20,
    color: COLORS.primaryTextColor,
  },
  featuresWrapper: {
    flex: 1,
  },
  featuresText: {
    fontSize: 18,
    marginBottom: 6,
    color: COLORS.primaryTextColor,
  },
  featuresContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 6,
  },
  featuresTextItem: {
    flex: 1,
    alignSelf: 'center',
  },
  timesContainer: {
    flexDirection: 'row',
    paddingTop: 25,
    backgroundColor: COLORS.black,
  },
  nextTime: {
    fontSize: 32,
    color: COLORS.primaryTextColor,
  },
  nextBlock: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 25,
    backgroundColor: COLORS.black,
  },
});
