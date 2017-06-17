import 'react-native';
import React from 'react';
import { default as AttributionButton } from './AttributionButton';
import renderer from 'react-test-renderer';

describe('<AttributionButton />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AttributionButton />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
