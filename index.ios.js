import React from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import codePush from 'react-native-code-push'
// import { Actions, Scene, Router, Reducer } from 'react-native-router-flux';
import { StackNavigator } from 'react-navigation';
import { COLORS } from './assets/styles/constants';
import RailMap from './scenes/RailMap';
import StationDetail from './scenes/StationDetail';
import ScheduleInfo from './scenes/ScheduleInfo';
import Faq from './scenes/FAQ';

const reducerCreate = (params) => {
  const defaultReducer = Reducer(params); // eslint-disable-line
  return (state, action) => defaultReducer(state, action);
};

const AppNavigator = StackNavigator({
  Main: {
    screen: RailMap,
    navigationOptions: {
      title: 'Charlotte Light Rail'
    }
  },
  Faq: {
    screen: Faq,
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
      backgroundColor: COLORS.backgroundColorDark
    },
    headerTintColor: COLORS.primaryTextColor
  }
});

export default class lightrail extends React.Component {

  componentDidMount() {
    // Uncomment out this line to enable codePush syncing
    // codePush.sync()
  }

  // This is the router. We're currently using react-native-router-flux, but it's been a little confusing to me. If it
  // becomes a problem, we can also look at @jcgertig's rn-router. If we do a rewrite, I'd like to try it.

  // Props can be passed to Scene components here, but once this component mounts, you can't really change the props.
  // Changes in props won't update the children at all. So that's of limited use.

  // Props can also be passed directly to scenes by including them with your Actions.sceneName() scene transition.
  // To change scenes from anywhere in the app, you can call Actions.sceneName (Actions.home, for example) to change to that scene.
  // To include props, you can do onPress={() => Actions.home({ coolDude: 'Brandon' })}, and the scene you're switching to gets this.props.coolDude
  // But again, because it's passed onPress, that prop won't update in the Scene if it changes in the originating component.
  // Now you can call Actions.refresh({ key: '0_home', coolDude: 'Tim' }) from anywhere too. Stuff to play with.
  // Where possible, I tried to maintain normal react parent/child relationships so I could pass props down and manipulate state the normal react way.

  render() {
    return (
      // <Router createReducer={reducerCreate}>
      //   <Scene key="root" navigationBarStyle={styles.navBarStyle} titleStyle={styles.titleStyle}>
      //     <Scene key="railMap" component={RailMap} initial title="Charlotte Light Rail" />
      //     <Scene key="about" component={Faq} title="Help" renderBackButton={this.renderBackButton} />
      //     <Scene key="stationDetail" component={StationDetail} renderBackButton={this.renderBackButton} title="Station Info" />
      //     <Scene key="stationSchedule" component={ScheduleInfo} renderBackButton={this.renderBackButton} title="Station Schedules" sceneStyle={{ backgroundColor: COLORS.backgroundColor }} />
      //   </Scene>
      // </Router>
      <AppNavigator />
    );
  }
}

AppRegistry.registerComponent('lightrail', () => lightrail);

const styles = StyleSheet.create({
  arrow: {
    borderStyle: 'solid',
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderColor: COLORS.primaryTextColor,
    marginRight: 6,
    height: 16,
    width: 16,
  },
  arrowLeft: {
    transform: [{ rotate: '-135deg' }],
  },
  navBarStyle: {
    backgroundColor: COLORS.backgroundColorDark,
    borderBottomWidth: 0,
    height: 65,
  },
  titleStyle: {
    color: COLORS.primaryTextColor,
    fontWeight: 'normal',
  },
});
