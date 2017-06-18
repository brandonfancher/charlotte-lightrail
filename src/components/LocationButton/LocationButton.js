import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from './LocationButtonCss';

export default class LocationButton extends React.Component {

  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    seeAllStations: PropTypes.func.isRequired,
  }

  getLocationImage() {
    const { error, loading } = this.props;
    if (error) {
      return (
        <Image
          inactiveIcon
          // eslint-disable-next-line
          source={require('../../assets/icons/location/ic_location_disabled_white.png')}
        />
      );
    } else if (loading) {
      return (
        <Image
          inactiveIcon
          // eslint-disable-next-line
          source={require('../../assets/icons/location/ic_location_searching_white.png')}
        />
      );
    }
    return (
      <Image
        // eslint-disable-next-line
        source={require('../../assets/icons/location/ic_my_location_white.png')}
      />
    );
  }

  render() {
    const { seeAllStations } = this.props;
    return (
      <TouchableOpacity onPress={seeAllStations}>
        {this.getLocationImage()}
      </TouchableOpacity>
    );
  }
}
