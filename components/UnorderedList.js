import React from 'react';
import { Text, View } from 'react-native';

const UnorderedList = ({ content, styles }) => (
  <View>
    {content.map((text, index) => (
      <View style={styles.bulletWrapper} key={`bullet-${index}`}>
        <View style={styles.bullet}>
          <Text allowFontScaling={false} style={styles.content}>&#9679;</Text>
        </View>
        <View style={styles.bulletContent}>
          <Text allowFontScaling={false} style={styles.content}>{text}</Text>
        </View>
      </View>
    ))}
  </View>
);

UnorderedList.propTypes = {
  content: React.PropTypes.array.isRequired,
  styles: React.PropTypes.object.isRequired,
};

export default UnorderedList;
