import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native'

export default class ModeButton extends React.Component {

  static propTypes = {
    currentMode: PropTypes.string.isRequired,
    desiredMode: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    styles: PropTypes.object.isRequired
  }

  getIcon () {
    if (this.props.desiredMode === 'walking') {
      return require('../assets/icons/walk/ic_directions_walk.png')
    }
    return require('../assets/icons/drive/ic_drive_eta.png')
  }

  render () {
    const onPress = this.props.onPress
    const currentMode = this.props.currentMode
    const desiredMode = this.props.desiredMode
    const styles = this.props.styles

    return (
      <TouchableOpacity onPress={onPress} style={[styles.bubble, styles.bottomButton]}>
        <Image style={currentMode === desiredMode ? styles.activeIcon : styles.inactiveIcon} source={this.getIcon()} />
      </TouchableOpacity>
    )
  }
}
