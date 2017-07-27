import React from 'react';
import { snapshotStyledComponent } from 'helpers/snapshotStyledComponent';
import StationCard from './StationCard';

describe('<StationCard />', () => {
  let props;

  beforeAll(() => {
    props = {
      connected: true,
      loading: false,
      mode: 'walking',
      panToStation: jest.fn(),
      navigation: { navigate: jest.fn() }
    };
  });

  it('renders correctly', () => {
    snapshotStyledComponent(
      <StationCard {...props} />
    );
  });
});
