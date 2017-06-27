import 'react-native';
import React from 'react';
import StationCard from './StationCard';
import renderer from 'react-test-renderer';

describe('<StationCard />', () => {
  let props;

  beforeAll(() => {
    props = {
      connected: true,
      loading: false,
      mode: 'walking',
      panToStation: jest.fn(),
      navigation: { navigate: jest.fn() }
    }
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <StationCard {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});