import React from 'react';
import { Image, TouchableOpacity } from 'react-native';


export default class DirectionsButton extends React.Component {

  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    styles: React.PropTypes.object.isRequired,
  }

  render() {
    const onPress = this.props.onPress;
    const styles = this.props.styles;

    return (
      <TouchableOpacity onPress={onPress} style={styles.bubble}>
        <Image
          style={styles.activeIcon}
          // eslint-disable-next-line
          source={require('../assets/icons/directions/ic_directions_white_36pt.png')}
        />
      </TouchableOpacity>
    );
  }
}
