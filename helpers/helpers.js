import { Dimensions, Linking } from 'react-native';

// identify iPhone model based on device width
const deviceScreen = Dimensions.get('window');
export const identifyDevice = () => {
  if (deviceScreen.width === 414) {
    return 'iPhone 6+';
  } else if (deviceScreen.width === 320) {
    return 'iPhone 5';
  }
  return 'iPhone 6';
};

export const startNavigation = (mode, latlng) => {
  const { latitude, longitude } = latlng;

  const googleMapsURL = `comgooglemaps://?daddr=${latitude},${longitude}&directionsmode=${mode}`;
  const appleMapsURL = `http://maps.apple.com?daddr=${latitude},${longitude}&dirflg=${mode}`;

  Linking.canOpenURL(googleMapsURL)
    .then((supported) => {
      if (supported) {
        Linking
          .openURL(googleMapsURL)
          .catch(err => console.error('Either Google Maps is not installed or some other error occurred: ', err));
      } else {
        Linking
          .openURL(appleMapsURL)
          .catch(err => console.error('An error occurred: ', err));
      }
    });
};
