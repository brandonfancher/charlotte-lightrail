import 'react-native';
import React from 'react';
import DirectionsButton from './DirectionsButton';
import renderer from 'react-test-renderer';

describe('<DirectionsButton />', () => {
  let props;

  beforeAll(() => {
    props = {
      onPress: jest.fn()
    }
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <DirectionsButton {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
