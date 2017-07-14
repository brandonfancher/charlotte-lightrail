import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { COLORS } from 'assets/styles/constants';
import renderer from 'react-test-renderer';

export const snapshotStyledComponent = (component) => {
  const snapshot = renderer.create(
    <ThemeProvider theme={COLORS}>
      {component}
    </ThemeProvider>
  ).toJSON()
  expect(snapshot).toMatchSnapshot();
};