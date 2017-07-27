import React from 'react';
import { snapshotStyledComponent } from 'helpers/snapshotStyledComponent';
import UnorderedList from './UnorderedList';

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
    };
  });

  it('renders correctly', () => {
    snapshotStyledComponent(
      <UnorderedList {...props} />
    );
  });
});
