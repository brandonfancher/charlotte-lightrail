import 'react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { COLORS } from '../../assets/styles/constants';
import MapOverlay from './MapOverlay';
jest.mock('SegmentedControlIOS');
import renderer from 'react-test-renderer';

describe('<MapOverlay />', () => {
  let props;

  beforeAll(() => {
    props = {
      connected: true,
      loading: false,
      mode: 'walking',
      fetchNearest: jest.fn(),
      showCallout: jest.fn(),
      locationDenied: false,
      seeAllStations: jest.fn(),
      navigation: { navigate: jest.fn() }
    }
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider theme={COLORS}>
        <MapOverlay {...props} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});