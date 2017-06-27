import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, SegmentedControlIOS, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import userDefaults from 'react-native-user-defaults';
import LocationButton from './LocationButton';
import StationSlider from './StationDetail/StationSlider';
import { COLORS } from 'assets/styles/constants';


export default class MapOverlay extends React.Component {

  static propTypes = {
    connected: PropTypes.bool.isRequired,
    error: PropTypes.string,
    fetchNearest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    locationDenied: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    nearestStationIndex: PropTypes.number, // eslint-disable-line
    seeAllStations: PropTypes.func.isRequired,
    showCallout: PropTypes.func.isRequired, // eslint-disable-line
    stationDistances: PropTypes.array, // eslint-disable-line
  }

  state = {
    displaySchedule: false,
  }

  handleZeroState = () => {
    const { fetchNearest, locationDenied } = this.props;
    if (locationDenied) {
      Alert.alert('Enable location services in Privacy Settings to see your location and nearest station');
    } else {
      fetchNearest();
    }
  }

  render() {
    const { displaySchedule } = this.state;
    const { connected, error, fetchNearest, loading, locationDenied, mode, seeAllStations } = this.props;
    const { navigate } = this.props.navigation;

    const failText = locationDenied ? 'Location Disabled - Enable' : 'Offline Mode - Try Again';

    return (
      <View pointerEvents="box-none" style={styles.container}>
        {!displaySchedule &&
          <View pointerEvents="box-none" style={styles.header}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigate('Faq')} style={styles.about}>
                <View style={styles.help}>
                  <Image
                    // eslint-disable-next-line
                    source={require('../assets/icons/help/ic_help_white.png')}
                  />
                </View>
              </TouchableOpacity>
              {connected && !locationDenied
                ?
                  <SegmentedControlIOS
                    values={['Driving', 'Walking']}
                    selectedIndex={mode === 'driving' ? 0 : 1}
                    onValueChange={(value) => {
                      userDefaults.set('SavedDirectionsChoice', value.toLowerCase()).catch(err => console.log(err));
                      fetchNearest(value.toLowerCase());
                    }}
                    tintColor="white"
                    style={styles.modeSelector}
                  />
                :
                  <TouchableOpacity style={styles.offlineButton} onPress={() => this.handleZeroState()}>
                    <Text allowFontScaling={false} style={styles.offlineText}>{failText}</Text>
                  </TouchableOpacity>
              }
              <LocationButton seeAllStations={seeAllStations} error={error} loading={loading} />
            </View>
          </View>
        }
        <StationSlider {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  offlineButton: {
    borderColor: COLORS.primaryBorderColor,
    borderWidth: 1,
    height: 28,
    paddingHorizontal: 4,
    paddingVertical: 2,
    justifyContent: 'center',
    marginBottom: 6,
    borderRadius: 4,
  },
  offlineText: {
    color: COLORS.primaryTextColor,
    fontSize: 13,
  },
  about: {
    flex: 0.8,
    paddingTop: 1,
    paddingLeft: 14,
  },
  activeIcon: { // eslint-disable-line
    opacity: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  header: {
    backgroundColor: COLORS.backgroundColorDark,
    height: 40,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  help: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  inactiveIcon: { // eslint-disable-line
    opacity: 0.4,
  },
  locationMarker: { // eslint-disable-line
    flex: 0.8,
    alignItems: 'flex-end',
    paddingTop: 1,
    paddingRight: 14,
  },
  modeSelector: {
    flex: 1.5,
    marginBottom: 10,
  },
});
