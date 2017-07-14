import React from 'react';
import { snapshotStyledComponent } from 'helpers/helpers';
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
    snapshotStyledComponent(
      <DirectionsButton {...props} />
    );
  });
});
