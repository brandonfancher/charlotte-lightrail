import { Dimensions } from 'react-native';

// identify iPhone model based on device width
const identifyDevice = (deviceScreenProps) => {
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
let defaultCenter = {};
let defaultZoom;
if (deviceName === 'iPhone 6+') {
  deviceVariableSizes = {
    calloutHeight: 300,
    nextTimeFontSize: 40,
    stationLabelFontSize: 36,
    nextTimeWrapPaddingVertical: 4,
    nearestStationText: 'Nearest Station - '
  };
  defaultCenter = {
    latitude: 35.12848262558094,
    longitude: -80.84703007335676
  };
  defaultZoom = 10.35016331854935;
} else if (deviceName === 'iPhone 6') {
  deviceVariableSizes = {
    calloutHeight: 279,
    nextTimeFontSize: 36,
    stationLabelFontSize: 30,
    nextTimeWrapPaddingVertical: 1,
    nearestStationText: 'Nearest Station - '
  };
  defaultCenter = {
    latitude: 35.09018630471958,
    longitude: -80.84307324707783
  };
  defaultZoom = 9.228717656576594;
} else {
  deviceVariableSizes = {
    calloutHeight: 279,
    nextTimeFontSize: 33,
    stationLabelFontSize: 22,
    nextTimeWrapPaddingVertical: 1,
    nearestStationText: 'Nearest - '
  };
  defaultCenter = {
    latitude: 35.12642689061146,
    longitude: -80.8549019571087
  };
  defaultZoom = 10.10400032344327;
}

const calloutBoxHeight = deviceVariableSizes.calloutHeight - 25; // excludes triangle
const blueBoxHeight = calloutBoxHeight * 0.45; // 45% of calloutBoxHeight
const blackBoxHeight = calloutBoxHeight * 0.55; // 55% of calloutBoxHeight

const insideColPadding = deviceScreen.width * 0.13;
const circleWrapperHeight = 54;
const circleWidth = 40;

export const deviceProps = {
  calloutBoxHeight,
  blueBoxHeight,
  blackBoxHeight,
  deviceVariableSizes,
  deviceScreen,
  defaultCenter,
  defaultZoom,
  deviceName,
  insideColPadding,
  circleWrapperHeight,
  circleWidth
};
