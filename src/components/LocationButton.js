import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';

export default class LocationButton extends React.Component {

  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    seeAllStations: PropTypes.func.isRequired,
    styles: PropTypes.object.isRequired,
  }

  getLocationImage() {
    const { error, loading, styles } = this.props;
    if (error) {
      return (
        <Image
          style={styles.inactiveIcon}
          // eslint-disable-next-line
          source={require('../assets/icons/location/ic_location_disabled_white.png')}
        />
      );
    } else if (loading) {
      return (
        <Image
          style={styles.inactiveIcon}
          // eslint-disable-next-line
          source={require('../assets/icons/location/ic_location_searching_white.png')}
        />
      );
    }
    return (
      <Image
        style={styles.activeIcon}
        // eslint-disable-next-line
        source={require('../assets/icons/location/ic_my_location_white.png')}
      />
    );
  }

  render() {
    const { seeAllStations, styles } = this.props;
    return (
      <TouchableOpacity onPress={seeAllStations} style={styles.locationMarker}>
        {this.getLocationImage()}
      </TouchableOpacity>
    );
  }
}
