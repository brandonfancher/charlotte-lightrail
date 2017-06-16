import 'react-native';
import React from 'react';

jest.mock('react-native-quick-actions', () => {
  return {
    popInitialAction: jest.fn(() => Promise.resolve(null)),
    setShortcutItems: jest.fn(() => Promise.resolve()),
    clearShortcutItems: jest.fn(() => Promise.resolve()),
    isSupported: jest.fn(() => Promise.resolve())
  }
});
import QuickAcitons from 'react-native-quick-actions';

jest.mock('react-native-mapbox-gl');

import Index from '../index.ios.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('lightrail', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Index />
    );
  });
});
