/* eslint-disable max-len no-console */
import React from 'react';
import { ActionSheetIOS, Alert } from 'react-native';
import userDefaults from 'react-native-user-defaults';
import { displayLink } from 'helpers/config';
import { AttributionTouchableOpacity, AttributionIconImage } from './AttributionButtonCss';

export default class AttributionButton extends React.Component {

  showActionSheet = () => {
    const options = [
      '© Mapbox',
      '© OpenStreetMap',
      'Mapbox Telemetry',
      'Cancel'
    ];
    const cancelButtonIndex = 3;
    const title = 'Map Credits and Options';

    const setParticipation = willParticipate => userDefaults.set('MGLMapboxMetricsEnabled', willParticipate).catch(err => console.log(err));
    const participatingMessage = 'You are helping to make OpenStreetMap and Mapbox maps better by contributing anonymous usage data.';
    const notParticipatingMessage = 'You can help make OpenStreetMap and Mapbox maps better by contributing anonymous usage data.';
    const participatingOptions = [
      { text: 'Tell Me More', onPress: () => displayLink('https://www.mapbox.com/telemetry/') },
      { text: 'Stop Participating', onPress: () => setParticipation('0') },
      { text: 'Keep Participating', style: 'cancel', onPress: () => setParticipation('1') }
    ];
    const notParticipatingOptions = [
      { text: 'Tell Me More', onPress: () => displayLink('https://www.mapbox.com/telemetry/') },
      { text: "Don't Participate", onPress: () => setParticipation('0') },
      { text: 'Participate', style: 'cancel', onPress: () => setParticipation('1') }
    ];
    ActionSheetIOS.showActionSheetWithOptions({ options, cancelButtonIndex, title }, (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          displayLink('https://www.mapbox.com/about/maps/');
          break;
        case 1:
          displayLink('http://www.openstreetmap.org/about/');
          break;
        case 2:
          userDefaults.get('MGLMapboxMetricsEnabled')
            .then((participating) => {
              if (participating === '1') {
                Alert.alert('Make Mapbox Maps Better', participatingMessage, participatingOptions);
              } else if (participating === '0') {
                Alert.alert('Make Mapbox Maps Better', notParticipatingMessage, notParticipatingOptions);
              } else {
                console.log('Unexpected value for MGLMapboxMetricsEnabled:', participating);
              }
            });
          break;
        default:
          break;
      }
    });
  }

  render() {
    return (
      <AttributionTouchableOpacity onPress={this.showActionSheet}>
        <AttributionIconImage
          // eslint-disable-next-line
          source={require('assets/icons/info/info_circle.png')}
        />
      </AttributionTouchableOpacity>
    );
  }
}
