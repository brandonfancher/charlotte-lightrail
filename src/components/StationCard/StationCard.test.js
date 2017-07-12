import 'react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { COLORS } from '../../assets/styles/constants';
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
      <ThemeProvider theme={COLORS}>
        <StationCard {...props} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});