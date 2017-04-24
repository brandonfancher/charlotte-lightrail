import React, { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { COLORS } from '../assets/styles/constants'

export default class StationDetail extends React.Component {

  renderStationFeatures () {
    const { stop } = this.props
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
    )
  }

  render () {
    const { activeCallout, stop } = this.props
    const nextInboundTime = activeCallout.inbound.time
    const nextInboundDelta = activeCallout.inbound.delta
    const nextOutboundTime = activeCallout.outbound.time
    const nextOutboundDelta = activeCallout.outbound.delta

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
    )
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    marginTop: 65,
    backgroundColor: COLORS.backgroundColor
  },
  iconImage: {
    paddingLeft: 10,
    paddingRight: 20
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
  underline: {
    textDecorationLine: 'underline'
  },
  smallText: {
    color: '#ffffff',
    fontSize: 13
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
    color: '#ffffff'
  },
  subtitle: {
    alignSelf: 'center',
    fontSize: 28,
    marginTop: 20,
    marginBottom: 20,
    color: '#ffffff'
  },
  featuresWrapper: {
    flex: 1
  },
  featuresText: {
    fontSize: 18,
    marginBottom: 6,
    color: '#ffffff'
  },
  featuresContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 6
  },
  featuresTextItem: {
    flex: 1,
    alignSelf: 'center'
  },
  featureTitle: {
    marginVertical: 14,
    marginHorizontal: 14
  },
  timesContainer: {
    flexDirection: 'row',
    paddingTop: 25,
    backgroundColor: '#000000'
  },
  nextTime: {
    fontSize: 32,
    color: '#ffffff'
  },
  nextBlock: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 25,
    backgroundColor: '#000000'
  }
})

StationDetail.propTypes = {
  activeCallout: React.PropTypes.object.isRequired,
  stop: React.PropTypes.object.isRequired
}
