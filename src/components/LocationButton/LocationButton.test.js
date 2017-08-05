import React from 'react';
import renderer from 'react-test-renderer';
import LocationButton from './LocationButton';

describe('<LocationButton />', () => {
  let props;
  let loading;

  beforeAll(() => {
    props = {
      seeAllStations: jest.fn()
    };
    loading = true;
  });

  it('renders correctly with an error', () => {
    const error = 'Error message';

    const tree = renderer.create(
      <LocationButton {...props} error={error} loading={loading} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with no error and loading', () => {
    const tree = renderer.create(
      <LocationButton {...props} loading={loading} />
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
