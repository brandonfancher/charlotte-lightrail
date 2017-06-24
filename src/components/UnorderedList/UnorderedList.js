import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Text, BulletContentView, BulletView, BulletWrapperView } from './UnorderedListCss';

export default class UnorderedList extends React.Component {

  static propTypes = {
    content: PropTypes.array.isRequired
  }

  render() {
    const { content } = this.props;
    return (
      <View>
        {content.map((text, index) => (
          <BulletWrapperView key={`bullet-${index}`}>
            <BulletView>
              <Text allowFontScaling={false}>&#9679;</Text>
            </BulletView>
            <BulletContentView>
              <Text allowFontScaling={false}>{text}</Text>
            </BulletContentView>
          </BulletWrapperView>
        ))}
      </View>
    );
  }
}
