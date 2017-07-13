import { StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { default as AttributionButton } from './AttributionButton';
import renderer from 'react-test-renderer';

const deviceScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  bottomSection: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },
  creditSection: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: (deviceScreen.width > 375 ? 275 : 254) + 4,
    width: deviceScreen.width,
  },
  attribution: {
    position: 'relative',
    marginHorizontal: 4,
    height: 20,
    width: 20,
  },
  attributionIcon: { // eslint-disable-line
    height: 20,
    width: 20,
  },
  calloutSection: {
    width: deviceScreen.width,
  },
  mapboxIcon: {
    flex: 1,
    height: 20,
    width: 50,
    resizeMode: 'contain',
  },
});

describe('<AttributionButton />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AttributionButton styles={styles} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
