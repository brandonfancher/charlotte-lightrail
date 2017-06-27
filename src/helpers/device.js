import { Dimensions } from 'react-native';
import { COLORS } from 'assets/styles/constants';

// identify iPhone model based on device width
const identifyDevice = deviceScreenProps => {
  if (deviceScreenProps.width === 414) {
    return 'iPhone 6+';
  } else if (deviceScreenProps.width === 320) {
    return 'iPhone 5';
  }
  return 'iPhone 6';
};

const deviceScreen = Dimensions.get('window');
const deviceName = identifyDevice(deviceScreen);
let deviceVariableSizes = {};
if (deviceName === 'iPhone 6+') {
  deviceVariableSizes.calloutHeight = 300;
  deviceVariableSizes.nextTimeFontSize = 40;
  deviceVariableSizes.stationLabelFontSize = 36;
  deviceVariableSizes.nextTimeWrapPaddingVertical = 4;
  deviceVariableSizes.nearestStationText = 'Nearest Station - ';
} else if (deviceName === 'iPhone 6') {
  deviceVariableSizes.calloutHeight = 279;
  deviceVariableSizes.nextTimeFontSize = 36;
  deviceVariableSizes.stationLabelFontSize = 30;
  deviceVariableSizes.nextTimeWrapPaddingVertical = 1;
  deviceVariableSizes.nearestStationText = 'Nearest Station - ';
} else {
  deviceVariableSizes.calloutHeight = 279;
  deviceVariableSizes.nextTimeFontSize = 33;
  deviceVariableSizes.stationLabelFontSize = 22;
  deviceVariableSizes.nextTimeWrapPaddingVertical = 1;
  deviceVariableSizes.nearestStationText = 'Nearest - ';
}

const calloutBoxHeight = deviceVariableSizes.calloutHeight - 25; // excludes triangle
const blueBoxHeight = calloutBoxHeight * 0.45; // 45% of calloutBoxHeight
const blackBoxHeight = calloutBoxHeight * 0.55; // 55% of calloutBoxHeight

export const deviceProps = {
  calloutBoxHeight,
  blueBoxHeight,
  blackBoxHeight,
  deviceVariableSizes,
  deviceScreen
};
