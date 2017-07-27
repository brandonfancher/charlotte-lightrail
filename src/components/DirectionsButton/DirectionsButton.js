import React from 'react';
import PropTypes from 'prop-types';
import { BubbleTouchableOpacity, ActiveIconImage } from './DirectionsButtonCss';

export default class DirectionsButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired
  }

  render() {
    const { onPress } = this.props;

    return (
      <BubbleTouchableOpacity onPress={onPress}>
        <ActiveIconImage
          // eslint-disable-next-line
          source={require('assets/icons/directions/ic_directions_white_36pt.png')}
        />
      </BubbleTouchableOpacity>
    );
  }
}
