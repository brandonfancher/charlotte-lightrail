import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from './UnorderedListCss';

export default class UnorderedList extends React.Component {

  static propTypes = {
    content: PropTypes.array.isRequired
  }

  render() {
    const { content } = this.props;
    return (
      <View>
        {content.map((text, index) => (
          <View bulletWrapper key={`bullet-${index}`}>
            <View bullet>
              <Text allowFontScaling={false}>&#9679;</Text>
            </View>
            <View bulletContent>
              <Text allowFontScaling={false}>{text}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
