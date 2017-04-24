import React, { Image, TouchableOpacity } from 'react-native'

export default class LocationButton extends React.Component {

  getLocationImage () {
    const styles = this.props.styles

    if (this.props.error) {
      return <Image style={styles.inactiveIcon} source={require('../assets/icons/location/ic_location_disabled_white.png')} />
    } else if (this.props.loading) {
      return <Image style={styles.inactiveIcon} source={require('../assets/icons/location/ic_location_searching_white.png')} />
    }
    return <Image style={styles.activeIcon} source={require('../assets/icons/location/ic_my_location_white.png')} />
  }

  render () {
    const props = this.props
    const styles = props.styles

    return (
      <TouchableOpacity onPress={props.seeAllStations} style={styles.locationMarker}>
        {this.getLocationImage()}
      </TouchableOpacity>
    )
  }
}

LocationButton.propTypes = {
  error: React.PropTypes.string,
  loading: React.PropTypes.bool.isRequired,
  seeAllStations: React.PropTypes.func.isRequired,
  styles: React.PropTypes.object.isRequired
}
