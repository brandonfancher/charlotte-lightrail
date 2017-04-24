import React, { ActivityIndicatorIOS, Dimensions, Image, Linking, StyleSheet, Text,
  TouchableOpacity, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { blueStops, identifyDevice } from '../../helpers/config'
import { COLORS } from '../../assets/styles/constants'
import DirectionsButton from '../DirectionsButton'

export default class StationCard extends React.Component {

  startNavigation (mode, latlng) {
    const { latitude, longitude } = latlng

    const googleMapsURL = `comgooglemaps://?daddr=${latitude},${longitude}&directionsmode=${mode}`
    const appleMapsURL = `http://maps.apple.com?daddr=${latitude},${longitude}&dirflg=${mode}`

    Linking.canOpenURL(googleMapsURL)
      .then(supported => {
        if (supported) {
          Linking.openURL(googleMapsURL).catch(err => console.error('Either Google Maps is not installed or some other error occurred: ', err))
        } else {
          Linking.openURL(appleMapsURL).catch(err => console.error('An error occurred: ', err))
        }
      })
  }

  renderDistanceText () {
    const { stationIndex, stationDistances, mode } = this.props
    if (stationDistances) {
      return `${stationDistances[stationIndex].durationText} ${mode === 'driving' ? 'drive' : 'walk'}`
    }
    return null
  }

  render () {
    const { connected, loading, mode, nearestStationIndex, panToStation, stationIndex, stopCallout } = this.props
    const stop = blueStops[stationIndex]
    const onNearestStation = stationIndex === nearestStationIndex
    if (stopCallout && stopCallout.inbound && !loading) {
      return (
        <View key={`nearestContainer-${stationIndex}`} style={styles.nearestContainer}>
          <View style={styles.triangle} />
          <View style={styles.infoContainer}>
            {stationIndex > 0
              ? <TouchableOpacity style={styles.arrowWrapper} onPress={() => panToStation(-1)}>
                  <View style={[styles.arrow, styles.arrowLeft]} />
                </TouchableOpacity>
              : <View style={styles.arrowWrapper}>
                  <View style={[styles.arrow, styles.arrowLeft, styles.arrowDisabled]} />
                </View>
            }
            <View style={styles.stationLabelContainer}>
              <Text allowFontScaling={false} style={styles.stationLabel}>{stop.mapLabel}</Text>
              {connected && <Text allowFontScaling={false} style={[styles.grayText, styles.smallText]}>
                {onNearestStation && deviceVariableSizes.nearestStationText}{this.renderDistanceText()}
              </Text>}
            </View>
            {stationIndex < blueStops.length - 1
              ? <TouchableOpacity style={styles.arrowWrapper} onPress={() => panToStation(1)}>
                  <View style={[styles.arrow, styles.arrowRight]} />
                </TouchableOpacity>
              : <View style={styles.arrowWrapper}>
                  <View style={[styles.arrow, styles.arrowRight, styles.arrowDisabled]} />
                </View>
            }
          </View>
          <View style={styles.timesContainer}>
            <View style={styles.nextBlock}>
              <Text allowFontScaling={false} style={[styles.grayText, styles.smallText]}>Next Inbound</Text>
              <View style={styles.nextTimeWrap}>
                <Text allowFontScaling={false} style={styles.nextTime}>{stopCallout.inbound.time}</Text>
              </View>
              <Text allowFontScaling={false} style={[styles.grayText, styles.smallText]}>{stopCallout.inbound.delta}</Text>
            </View>

            <View style={styles.nextBlock}>
              <Text allowFontScaling={false} style={[styles.grayText, styles.smallText]}>Next Outbound</Text>
              <View style={styles.nextTimeWrap}>
                <Text allowFontScaling={false} style={styles.nextTime}>{stopCallout.outbound.time}</Text>
              </View>
              <Text allowFontScaling={false} style={[styles.grayText, styles.smallText]}>{stopCallout.outbound.delta}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => Actions.stationDetail({ activeCallout: stopCallout, stop })} style={styles.bubble}>
                <Image source={require('../../assets/icons/info/ic_info_white_36pt.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.stationSchedule({ activeStationIndex: stationIndex, loading, stopCallout })} style={styles.bubble}>
                <Image source={require('../../assets/icons/schedule/ic_schedule_white_36pt.png')} />
              </TouchableOpacity>
              <DirectionsButton onPress={() => this.startNavigation(mode, stop.latlng)} styles={styles} />
            </View>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.nearestContainer}>
        <View style={styles.triangle} />
        <View style={styles.loadingWrapper}>
          <ActivityIndicatorIOS size='large' />
          <Text allowFontScaling={false} style={[styles.grayText, styles.loadingText]}>{connected ? 'Finding nearest station...' : 'Loading...'}</Text>
        </View>
      </View>
    )
  }
}

// Setup Device-Specific Variables
const device = identifyDevice()
const deviceScreen = Dimensions.get('window')
let deviceVariableSizes = {}
if (device === 'iPhone 6+') {
  deviceVariableSizes.calloutHeight = 300
  deviceVariableSizes.nextTimeFontSize = 40
  deviceVariableSizes.stationLabelFontSize = 36
  deviceVariableSizes.nextTimeWrapPaddingVertical = 4
  deviceVariableSizes.nearestStationText = 'Nearest Station - '
} else if (device === 'iPhone 6') {
  deviceVariableSizes.calloutHeight = 279
  deviceVariableSizes.nextTimeFontSize = 36
  deviceVariableSizes.stationLabelFontSize = 30
  deviceVariableSizes.nextTimeWrapPaddingVertical = 1
  deviceVariableSizes.nearestStationText = 'Nearest Station - '
} else {
  deviceVariableSizes.calloutHeight = 279
  deviceVariableSizes.nextTimeFontSize = 33
  deviceVariableSizes.stationLabelFontSize = 22
  deviceVariableSizes.nextTimeWrapPaddingVertical = 1
  deviceVariableSizes.nearestStationText = 'Nearest - '
}

const calloutBoxHeight = deviceVariableSizes.calloutHeight - 25 // excludes triangle
const blueBoxHeight = calloutBoxHeight * 0.45 // 45% of calloutBoxHeight
const blackBoxHeight = calloutBoxHeight * 0.55 // 55% of calloutBoxHeight

// Declare StyleSheet
const styles = StyleSheet.create({
  nearestContainer: {
    height: deviceVariableSizes.calloutHeight,
    width: deviceScreen.width
  },
  triangle: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.backgroundColorTrans
  },

  // infoContainer
  infoContainer: {
    height: blueBoxHeight,
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundColorTrans,
    paddingHorizontal: 12,
    paddingVertical: 0
  },
  arrowWrapper: {
    justifyContent: 'center',
    padding: 6
  },
  arrow: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderColor: COLORS.primaryTextColor,
    margin: 10,
    height: 30,
    width: 30
  },
  arrowLeft: {
    transform: [{ rotate: '-135deg' }]
  },
  arrowRight: {
    transform: [{ rotate: '45deg' }]
  },
  arrowDisabled: {
    borderColor: COLORS.disabledArrow
  },
  stationLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  stationLabel: {
    fontSize: deviceVariableSizes.stationLabelFontSize,
    color: COLORS.primaryTextColor
  },

  // timesContainer
  timesContainer: {
    height: blackBoxHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: COLORS.backgroundColorDark
  },
  nextBlock: {
    alignItems: 'center',
    flex: 1
  },
  nextTimeWrap: {
    paddingVertical: deviceVariableSizes.nextTimeWrapPaddingVertical
  },
  nextTime: {
    fontSize: deviceVariableSizes.nextTimeFontSize,
    color: COLORS.primaryTextColor
  },

  // buttonContainer
  buttonContainer: {
    position: 'absolute',
    height: 50,
    bottom: blackBoxHeight - (50 / 2),
    left: deviceScreen.width / 2 - ((50 + 12) * 3 / 2) // Half device width - half of ((buttonWidth + buttonPadding) * numButtons)
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  bubble: {
    backgroundColor: COLORS.backgroundColorButton,
    borderRadius: 50,
    borderWidth: 0,
    marginHorizontal: 6,
    padding: 7,
    width: 50,
    height: 50
  },

  // loadingWrapper
  loadingWrapper: {
    backgroundColor: COLORS.backgroundColorTrans,
    height: calloutBoxHeight,
    justifyContent: 'center'
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 10
  },

  // Miscellaneous
  grayText: {
    color: COLORS.grayText
  },
  whiteText: {
    color: COLORS.primaryTextColor
  },
  smallText: {
    fontSize: 13
  },
  title: {
    color: COLORS.primaryTextColor,
    paddingTop: 20,
    fontSize: 16
  }
})

StationCard.propTypes = {
  connected: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  mode: React.PropTypes.string.isRequired,
  nearestStationIndex: React.PropTypes.number,
  panToStation: React.PropTypes.func.isRequired,
  stationDistances: React.PropTypes.array,
  stationIndex: React.PropTypes.number,
  stopCallout: React.PropTypes.object
}
