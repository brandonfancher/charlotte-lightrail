import React from 'react';
import { snapshotStyledComponent } from 'helpers/snapshotStyledComponent';
import StationSlider from './StationSlider';

describe('<StationSlider />', () => {
  let props;

  beforeAll(() => {
    props = {
      connected: true,
      loading: false,
      mode: 'walking',
      showCallout: jest.fn(),
      navigation: { navigate: jest.fn() }
    };
  });

  it('renders correctly', () => {
    snapshotStyledComponent(
      <StationSlider {...props} />
    );
  });
});
