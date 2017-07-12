import 'react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { COLORS } from 'assets/styles/constants';
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
    const tree = renderer.create(
      <ThemeProvider theme={COLORS}>
        <DirectionsButton {...props} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
