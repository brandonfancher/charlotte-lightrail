import React from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import codePush from 'react-native-code-push'
import { Actions, Scene, Router, Reducer } from 'react-native-router-flux';
import { COLORS } from './assets/styles/constants';
import RailMap from './scenes/RailMap';
import StationDetail from './scenes/StationDetail';
import ScheduleInfo from './scenes/ScheduleInfo';
import Faq from './scenes/FAQ';

const reducerCreate = (params) => {
  const defaultReducer = Reducer(params); // eslint-disable-line
  return (state, action) => defaultReducer(state, action);
};

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

  renderBackButton = () => (
    <TouchableOpacity
      style={{
        width: 80,
        height: 48,
        position: 'absolute',
        bottom: -8,
        left: 14,
        justifyContent: 'center',
      }}
      onPress={Actions.pop}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.arrow, styles.arrowLeft]} />
        <Text style={[styles.titleStyle, { fontSize: 16 }]}>Back</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <Router createReducer={reducerCreate}>
        <Scene key="root" navigationBarStyle={styles.navBarStyle} titleStyle={styles.titleStyle}>
          <Scene key="railMap" component={RailMap} initial title="Charlotte Light Rail" />
          <Scene key="about" component={Faq} title="Help" renderBackButton={this.renderBackButton} />
          <Scene key="stationDetail" component={StationDetail} renderBackButton={this.renderBackButton} title="Station Info" />
          <Scene key="stationSchedule" component={ScheduleInfo} renderBackButton={this.renderBackButton} title="Station Schedules" sceneStyle={{ backgroundColor: COLORS.backgroundColor }} />
        </Scene>
      </Router>
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
