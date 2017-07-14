import React from 'react';
import { snapshotStyledComponent } from 'helpers/helpers';
import UnorderedList from './UnorderedList';
import renderer from 'react-test-renderer';

describe('<UnorderedList />', () => {
  let props;

  beforeAll(() => {
    props = {
      content: [
        'Find the closest station',
        'Get directions, on foot, or by car',
        'See when the next train is coming',
        'See the full rail schedule',
        'See these FAQs about riding the rails'
      ]
    }
  });

  it('renders correctly', () => {
    snapshotStyledComponent(
      <UnorderedList {...props} />
    );
  });
});