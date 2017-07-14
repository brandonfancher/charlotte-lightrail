import React from 'react';
import LocationButton from './LocationButton';
import renderer from 'react-test-renderer';

describe('<LocationButton />', () => {
  let props;

  beforeAll(() => {
    props = {
      seeAllStations: jest.fn()
    }
  });

  it('renders correctly with an error', () => {
    const error = 'Error message';

    const tree = renderer.create(
      <LocationButton {...props} error={error} loading={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with no error and loading', () => {
    const tree = renderer.create(
      <LocationButton {...props} loading={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with no error and not loading', () => {
    const tree = renderer.create(
      <LocationButton {...props} loading={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});