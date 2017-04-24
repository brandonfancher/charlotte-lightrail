import React, { Image, TouchableOpacity } from 'react-native'

export default class ModeButton extends React.Component {

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

ModeButton.propTypes = {
  currentMode: React.PropTypes.string.isRequired,
  desiredMode: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  styles: React.PropTypes.object.isRequired
}
