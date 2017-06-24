import 'react-native';
import React from 'react';
import ScheduleInfoHeader from './ScheduleInfoHeader';
jest.mock('SegmentedControlIOS');
import renderer from 'react-test-renderer';

describe('<ScheduleInfoHeader />', () => {
  let props;

// static propTypes = {
//     scheduleIndex: PropTypes.number.isRequired,
//     scheduleValueHandler: PropTypes.func.isRequired,
//     stationName: PropTypes.string.isRequired,
//   }

  beforeAll(() => {
    props = {
      scheduleIndex: 1,
      scheduleValueHandler: jest.fn(),
      stationName: 'Test Station'
    }
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <ScheduleInfoHeader {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});