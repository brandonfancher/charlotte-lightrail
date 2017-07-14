import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { ContentText, BulletContentView, BulletView, BulletWrapperView } from './UnorderedListCss';

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
              <ContentText allowFontScaling={false}>&#9679;</ContentText>
            </BulletView>
            <BulletContentView>
              <ContentText allowFontScaling={false}>{text}</ContentText>
            </BulletContentView>
          </BulletWrapperView>
        ))}
      </View>
    );
  }
}
