import React, { Image, TouchableOpacity } from 'react-native'

export default class DirectionsButton extends React.Component {

  render () {
    const onPress = this.props.onPress
    const styles = this.props.styles

    return (
      <TouchableOpacity onPress={onPress} style={styles.bubble}>
        <Image style={styles.activeIcon} source={require('../assets/icons/directions/ic_directions_white_36pt.png')} />
      </TouchableOpacity>
    )
  }
}

DirectionsButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  styles: React.PropTypes.object.isRequired
}
