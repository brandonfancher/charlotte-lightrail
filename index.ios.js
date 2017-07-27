import React from 'react';
import { AppRegistry, Platform } from 'react-native';
// import codePush from 'react-native-code-push'
import { StackNavigator } from 'react-navigation';
import { ThemeProvider } from 'styled-components/native';
import { COLORS } from 'assets/styles/constants';
import { FAQ, RailMap, StationDetail, ScheduleInfo } from 'scenes';

// eslint-disable-next-line
const AppNavigator = StackNavigator({
  Main: {
    screen: RailMap,
    navigationOptions: {
      title: 'Charlotte Light Rail'
    }
  },
  Faq: {
    screen: FAQ,
    navigationOptions: {
      title: 'Help'
    }
  },
  StationDetail: {
    screen: StationDetail,
    navigationOptions: {
      title: 'Station Info'
    }
  },
  StationSchedule: {
    screen: ScheduleInfo,
    navigationOptions: {
      title: 'Station Schedules'
    }
  }
}, {
  initialRouteName: 'Main',
  navigationOptions: {
    headerStyle: {
      backgroundColor: COLORS.backgroundColorDark,
      ...Platform.select({
        ios: {
          shadowOpacity: 0
        },
        android: {
          elevation: 0
        }
      })
    },
    headerTintColor: COLORS.primaryTextColor
  }
});

export default class lightrail extends React.Component {

  componentDidMount() {
    // Uncomment out this line to enable codePush syncing
    // codePush.sync()
  }

  render() {
    return (
      <ThemeProvider theme={COLORS}>
        <AppNavigator />
      </ThemeProvider>
    );
  }
}

AppRegistry.registerComponent('lightrail', () => lightrail);
