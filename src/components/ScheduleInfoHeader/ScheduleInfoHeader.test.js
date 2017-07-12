import 'react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { COLORS } from 'assets/styles/constants';
import ScheduleInfoHeader from './ScheduleInfoHeader';
jest.mock('SegmentedControlIOS');
import renderer from 'react-test-renderer';

describe('<ScheduleInfoHeader />', () => {
  let props;

  beforeAll(() => {
    props = {
      scheduleIndex: 1,
      scheduleValueHandler: jest.fn(),
      stationName: 'Test Station'
    }
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider theme={COLORS}>
        <ScheduleInfoHeader {...props} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});