import React from 'react';
import renderer from 'react-test-renderer';
import AttributionButton from './AttributionButton';

describe('<AttributionButton />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AttributionButton />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
