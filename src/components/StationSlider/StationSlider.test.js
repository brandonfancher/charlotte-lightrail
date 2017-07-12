import 'react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { COLORS } from '../../assets/styles/constants';
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
      <ThemeProvider theme={COLORS}>
        <StationSlider {...props} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});