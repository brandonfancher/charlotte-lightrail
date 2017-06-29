import 'react-native';
import React from 'react';
import StationSlider from './StationSlider';
import renderer from 'react-test-renderer';

describe('<StationSlider />', () => {
  let props;

  beforeAll(() => {
    props = {
      connected: true,
      loading: false,
      mode: 'walking',
      showCallout: jest.fn(),
      navigation: { navigate: jest.fn() }
    }
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <StationSlider {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});