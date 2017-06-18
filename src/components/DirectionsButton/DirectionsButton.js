import React from 'react';
import { TouchableOpacity, Image } from './DirectionsButtonCss';

export default class DirectionsButton extends React.Component {

  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
  }

  render() {
    const onPress = this.props.onPress;

    return (
      <TouchableOpacity onPress={onPress}>
        <Image
          // eslint-disable-next-line
          source={require('../../assets/icons/directions/ic_directions_white_36pt.png')}
        />
      </TouchableOpacity>
    );
  }
}
